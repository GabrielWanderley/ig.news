import Head from 'next/head'
import { GetStaticProps } from 'next/types'

import Prismic from '@prismicio/client'
import { getPrismicClient } from '../../services/prismic'

import styles from './styles.module.scss'


export default function Posts(){
 return(
    <>
       <Head>
               <title> posts | IgNews</title>
       </Head>

        <main className={styles.container}>
            <div className={styles.posts}>
                <a>
                    <time>01/09/2001</time>
                    <strong>como eu consigo amar e odiar um time </strong>
                    <p>its a chelsea thing é  isso que esse clube é pra mim incrivel e amedrontador eu amo ele incondicionalmente </p>
                </a>
                <a>
                    <time>01/09/2001</time>
                    <strong>como eu consigo amar e odiar um time </strong>
                    <p>its a chelsea thing é  isso que esse clube é pra mim incrivel e amedrontador eu amo ele incondicionalmente </p>
                </a>
                <a>
                    <time>01/09/2001</time>
                    <strong>como eu consigo amar e odiar um time </strong>
                    <p>its a chelsea thing é  isso que esse clube é pra mim incrivel e amedrontador eu amo ele incondicionalmente </p>
                </a>
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

    console.log(response)

    return(
        props:{}
    )
}