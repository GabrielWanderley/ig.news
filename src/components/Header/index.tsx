
import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

import { ActiveLink } from '../ActiveLink';


export function Header(){


return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt=""/>
                <nav>
                    <ActiveLink activeClassName={styles.active} href='/'>
                    <p>  Home </p>
                    </ActiveLink>
                    <ActiveLink href='/posts'activeClassName={styles.active}>
                    <p> Posts </p>
                    </ActiveLink>
                </nav>
                
                <SignInButton/>
            </div>
        </header>       
      )
}