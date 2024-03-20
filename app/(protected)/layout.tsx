import { authConfig } from "@/app/auth.config";
import styles from "./auth-bar.module.scss";
import { getServerSession } from "next-auth";
import Typography from "@/app/_components/Typography";
import SessionButton from "@/app/_components/session-button/session-button";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  const username = session?.user?.name;
  return (
    <main className={styles.container}>
      <div className={styles.bar}>
        <Typography>
          Logged in as <strong>{username ?? "Guest"}</strong>
        </Typography>
        <SessionButton isLoggedIn={!!username} className={styles.button} />
      </div>
      {children}
    </main>
  );
}
