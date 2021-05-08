import styles from '../styles/Home.module.scss'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()
  return (
    <Layout title="McDonald's">
      <section className={styles.section}>
        <div className={styles.content}>
          <div className={styles.paragraph}>
            <div className={styles.texts}>
              <span>We make people happy</span>
              <span>I'm love it!</span>

            </div>
            <img src="images/bigmac.png" alt="" />
            <button onClick={() => router.push('/menu')}>ORDER NOW</button>
          </div>
          <div className={styles.idk}></div>
          <div className={styles.idk2}></div>
        </div>
      </section>
    </Layout>
  )
}
