import Link from "next/link";
import { Character } from "@/types/character";

type Props = {
  character: Character;
};

export default function CharacterCard({ character }: Props) {
  return (
    <Link href={`/character/${character.id}`}>
      <article className="character-card">
        <img src={character.image} alt={character.name} />

        <div className="character-info">
          <h2>{character.name}</h2>
          <p>
            <strong>Estado:</strong> {character.status}
          </p>
          <p>
            <strong>Género:</strong> {character.gender}
          </p>
        </div>
      </article>
    </Link>
  );
}