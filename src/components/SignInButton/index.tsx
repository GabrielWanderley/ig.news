import styles from './style.module.scss'

import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'

import { signIn, signOut, useSession } from "next-auth/react";


export function SignInButton(){
    const { data: session } = useSession();
    console.log(session)

   return session ? (
    <button type="button"
     className={styles.singInButton}
     onClick={()=>signOut()}>
        <FaGithub color='#04d361'/>
        {session?.user?.name}
        <FiX color='#737380' className={styles.closeIcon}/>
    </button>
   ):(
    <button type="button" 
    className={styles.singInButton}
    onClick={()=>signIn('github')}>
        <FaGithub color='#eba417'/>
        Sign in with Github
    </button>
   )
}