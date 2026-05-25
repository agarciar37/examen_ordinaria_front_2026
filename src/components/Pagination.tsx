type Props = {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  setPage: (page: number) => void;
};

export default function Pagination({page, totalPages, hasNext, hasPrev, setPage,}: Props) {
  const pages = [
    1,
    2,
    3,
    page,
    totalPages - 2,
    totalPages - 1,
    totalPages,
  ]
    .filter((item) => item >= 1 && item <= totalPages)
    .filter((item, index, array) => array.indexOf(item) === index);

  return (
    <div className="pagination">
      <button disabled={!hasPrev} onClick={() => setPage(page - 1)}>
        Anterior
      </button>

      {pages.map((item) => (
        <button
          key={item}
          className={item === page ? "active-page" : ""}
          onClick={() => setPage(item)}
        >
          {item}
        </button>
      ))}

      <button disabled={!hasNext} onClick={() => setPage(page + 1)}>
        Siguiente
      </button>
    </div>
  );
}