import styles from './SignUpPage.module.scss'
import Typography from '../_components/Typography'
import SignUpForm from './signup-form'


export default function LoginPage() {

  return (
    <div className={styles.container}>
      <Typography variant="xl" className={styles.header}>
        Create your pokemon user account!
      </Typography>
      <SignUpForm />
    </div>
  )
}

