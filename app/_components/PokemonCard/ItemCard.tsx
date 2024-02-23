import { FC, ReactNode } from "react";
import styles from "./ItemCard.module.scss";
import Typography from "../Typography/typography";
import Image from "next/image";
import { capitalize } from "@/app/lib/strings";

interface ItemCardProps {
  title: string;
  id: number;
  imgUrl?: string;
  children?: ReactNode;
}

const ItemCard: FC<ItemCardProps> = ({ title, id, imgUrl, children }) => {
  return (
    <article className={styles.container}>
      <div className={styles.title}>
        <Typography variant="lg">{capitalize(title)}</Typography>
        <Typography variant="md" className={styles.id}>
          {id}
        </Typography>
      </div>
      <div className={styles.image}>
        <Image src={imgUrl ?? "/0.png"} alt={title} width={180} height={180} />
      </div>
      {children ? <div className={styles.bottom}>{children}</div> : null}
    </article>
  );
};

export default ItemCard;
