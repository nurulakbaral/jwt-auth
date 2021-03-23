import Head from 'next/head'
import styles from '../styles/Home.module.css'
import FormRegister from '../components/FormRegister'
import FormLogin from '../components/FormLogin'

const Home = () => {
  return (
    <section>
      <div className={styles.formWrapper}>
        <div>
          <h1 className={styles.title}>Register</h1>
        </div>
        <FormRegister className={styles.form} />
      </div>
      <div className={styles.formWrapper}>
        <div>
          <h1 className={styles.title}>Login</h1>
        </div>
        <FormLogin className={styles.form} />
      </div>
      <div>
        <h1 className={styles.footerTitle}>Made with Love!</h1>
      </div>
    </section>
  )
}

export default Home