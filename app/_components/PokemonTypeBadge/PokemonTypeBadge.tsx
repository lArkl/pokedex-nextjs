import { FC } from "react";
import Typography from "../Typography";
import styles from "./PokemonTypeBadge.module.scss";
import classNames from "classnames";
import { capitalize } from "@/app/lib/strings";

interface PokemonTypeBadgeProps {
  typeName: string;
  className?: string;
  testId?: string;
}

const PokemonTypeBadge: FC<PokemonTypeBadgeProps> = ({
  typeName,
  className,
  testId,
}) => {
  return (
    <div
      data-testid={testId ?? "PokemonTypeBadge"}
      className={classNames(styles.badge, styles[typeName], className)}
      style={{ backgroundColor: `var(--color-${typeName})` }}
    >
      <Typography className={styles.title}>{capitalize(typeName)}</Typography>
    </div>
  );
};

export default PokemonTypeBadge;
