"use client"
import Typography from './_components/Typography'
// import styles from './ErrorPage.module.scss'


export default function Error(){
  return (
    <div  aria-label="error">
      <Typography variant="xl">Something went wrong...</Typography>
      <Typography variant="lg">Try reloading the page in some seconds</Typography>
      <Typography variant="md">If this persists, contact to IT</Typography>
    </div>
  )
}

