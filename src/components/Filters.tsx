"use client";

type Props = {
  status: string;
  gender: string;
  nameInput: string;
  setStatus: (status: string) => void;
  setGender: (gender: string) => void;
  setNameInput: (name: string) => void;
  onSearch: () => void;
};

const statusOptions = ["", "Dead", "Alive", "unknown"];

const genderOptions = ["", "Female", "Male", "Genderless", "unknown"];

export default function Filters({
  status,
  gender,
  nameInput,
  setStatus,
  setGender,
  setNameInput,
  onSearch,
}: Props) {
  function getNextValue(options: string[], currentValue: string) {
    const currentIndex = options.indexOf(currentValue);

    if (currentIndex === -1 || currentIndex === options.length - 1) {
      return options[0];
    }

    return options[currentIndex + 1];
  }

  return (
    <div className="filters">
      <button onClick={() => setStatus(getNextValue(statusOptions, status))}>
        Estado: {status || "Sin filtro"}
      </button>

      <button onClick={() => setGender(getNextValue(genderOptions, gender))}>
        Género: {gender || "Sin filtro"}
      </button>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />

      <button onClick={onSearch}>Buscar</button>
    </div>
  );
}