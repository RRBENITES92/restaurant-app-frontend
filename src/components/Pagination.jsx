function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="pagination">
      <button
        className="button button-primary"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Anterior
      </button>

      <span>
        Página {page} de {totalPages}
      </span>

      <button
        className="button button-primary"
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;