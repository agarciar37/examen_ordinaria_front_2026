"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import CharacterCard from "@/components/CharacterCard";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import { CharactersResponse } from "@/types/character";

export default function HomePage() {
  const [data, setData] =useState<CharactersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);

        const response =
          await api.get<CharactersResponse>(
            "/character",
            {
              params: {
                page,
                status: status || undefined,
                gender: gender || undefined,
                name: nameFilter || undefined,
              },
            }
          );

        setData(response.data);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [page, status, gender, nameFilter]);

  function handleSearch() {
    setPage(1);

    setNameFilter(nameInput);
  }

  function handleStatusChange(
    newStatus: string
  ) {
    setStatus(newStatus);

    setPage(1);
  }

  function handleGenderChange(
    newGender: string
  ) {
    setGender(newGender);

    setPage(1);
  }

  return (
    <main>
      <h1>Rick & Morty 2026</h1>

      <Filters
        status={status}
        gender={gender}
        nameInput={nameInput}
        setStatus={handleStatusChange}
        setGender={handleGenderChange}
        setNameInput={setNameInput}
        onSearch={handleSearch}
      />

      {loading ? (
        <h2>Cargando personajes...</h2>
      ) : !data ? (
        <p className="subtitle">
          No existen resultados para los filtros elegidos.
        </p>
      ) : (
        <>
          <section className="characters-list">
            {data.results.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
              />
            ))}
          </section>

          <Pagination
            page={page}
            totalPages={data.info.pages}
            hasNext={!!data.info.next}
            hasPrev={!!data.info.prev}
            setPage={setPage}
          />
        </>
      )}
    </main>
  );
}