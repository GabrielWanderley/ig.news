import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"

import { getPrismicClient } from "../../services/prismic"
import { RichText } from "prismic-dom"

import Head from "next/head"

import styles from './post.module.scss'

interface PostsProps{
    post:{
        slug:string;
        title:string;
        content:string;
        updatedAt:string;
    }
}




export default function Post({post}: PostsProps){
    return(
    <>   
       <Head>
        <title>{post.title}| IgNews </title>
       </Head>
       <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div 
          className={styles.postContent}
          dangerouslySetInnerHTML={{__html:post.content}} />
        </article>
       </main>
    </>
    )
}
 
export const getServerSideProps: GetServerSideProps = async ({req, params}) =>{
  
    const session = await getSession({req})
    
    const {slug} = params; 

    if (!session?.activeSubscription){
        return{
            redirect:{
                destination:'/',
                permanent:false,
            }
        }
    }
    
    const prismic = getPrismicClient(req)

    const response = await prismic.getByUID<any>('publication', String(slug), {})
    
    if (!response) {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR',{
            day:'2-digit',
            month:'long',
            year:'numeric'
        })
    }
    return{
        props:{
            post ,
        }
    }
}