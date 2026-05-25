import api from "@/lib/api";
import { Character } from "@/types/character";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CharacterDetailPage({ params }: Props) {
  try {
    const { id } = await params;

    const response = await api.get<Character>(`/character/${id}`);
    const character = response.data;

    if (!character) {
      notFound();
    }

    return (
      <main>
        <Link className="back-link" href="/">
          ← Volver
        </Link>

        <div className="detail-card">
          <img src={character.image} alt={character.name} />

          <h1>{character.name}</h1>

          <p>
            <strong>ID:</strong> {character.id}
          </p>

          <p>
            <strong>Género:</strong> {character.gender}
          </p>

          <p>
            <strong>Estado:</strong> {character.status}
          </p>

          <p>
            <strong>Especie:</strong> {character.species}
          </p>

          <p>
            <strong>Origen:</strong> {character.origin.name}
          </p>

          <p>
            <strong>Location:</strong> {character.location.name}
          </p>
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}