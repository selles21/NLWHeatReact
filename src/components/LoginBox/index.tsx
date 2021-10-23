import { useContext } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'
import styles from './LoginBox.module.scss'

export function LoginBox() {

  const { signInUrl } = useContext(AuthContext)

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>
        Entre y comparta su mensaje
      </strong>
      <a href={signInUrl} className={styles.signInWithGithub} >
        <VscGithubInverted size="24" />
        Entrar con Github
      </a>
    </div>
  )
}
