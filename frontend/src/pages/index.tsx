import Header from '../components/Header';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header/>
      <h1>Homepage</h1>
    </div>
  )
}
