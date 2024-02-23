import Link from "next/link";
import Typography from "./_components/Typography";
import styles from "./PageNotFound.module.scss";

export default function NotFound() {
  return (
    <div>
      <div className={styles.container}>
        <Typography variant="xl">404</Typography>
        <Typography variant="md">Page not found</Typography>
        <Link href="/">
          <Typography variant="md">Return Home</Typography>
        </Link>
      </div>
    </div>
  );
}
