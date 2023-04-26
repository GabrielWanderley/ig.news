import Head from 'next/head'
import { GetStaticProps } from 'next/types'

import Prismic from '@prismicio/client'
import { getPrismicClient } from '../../services/prismic'
import { RichText } from 'prismic-dom'

import styles from './styles.module.scss'
import Link from 'next/link'

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps{
    posts: Post[]
}

export default function Posts({posts} : PostsProps){
 return(
    <>
       <Head>
               <title> posts | IgNews</title>
       </Head>

        <main className={styles.container}>
            <div className={styles.posts}>
                {posts.map(post =>(
                <Link href={`/posts/${post.slug}`} key={post.slug}  >
    
                    <time>{post.updatedAt}</time>
                    <strong>{post.title}</strong>
                    <p>{post.excerpt}</p>
               
                </Link> 
                ))}
            </div>
        </main>

    </>
 )
}

export const getStaticProps : GetStaticProps = async ()=>{

    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'publication')
    ],{
        fetch:['publication.title', 'publication.content'],
        pageSize:100,
    })
    
    //console.log(JSON.stringify(response, null, 2))
    const posts = response.results.map((post) =>{
        return{
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-br',{
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return{
        props:{ posts }
    }
}