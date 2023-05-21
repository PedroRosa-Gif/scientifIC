import "../styles/DivPagination.css"

interface IDivPaginationProps{
  functionToBack: () => void,
  functionToNext: () => void,
  currentPage: number
}

function DivPagination({functionToBack, functionToNext, currentPage}:IDivPaginationProps){

  return(
    <div className="div-pagination">
      {
        (currentPage > 1) ?
        <button onClick={functionToBack}>
          &lt;&lt;&lt; Anterior
        </button>
        :
        <></>
      }
      <button onClick={functionToNext}>
        Próxima &gt;&gt;&gt;
      </button>
    </div>
  )
}

export default DivPagination