import { FC } from "react";
import styles from "./PokemonDetailMoves.module.scss";
import Typography from "@/app/_components/Typography";
import { PokemonDto } from "@/app/lib/types";

interface PokemonDetailMovesProps {
  pokemonInfo: PokemonDto;
  className?: string;
}

const PokemonDetailMoves: FC<PokemonDetailMovesProps> = ({
  pokemonInfo,
  className,
}) => {
  return (
    <div aria-label="moves" className={className}>
      <Typography variant="lg">Moves</Typography>
      <ul className={styles.moves}>
        {pokemonInfo.moves.map((move) => (
          <li key={`moves-${move.id}`} className={styles.move}>
            <Typography variant="sm">{move.name}</Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetailMoves;
