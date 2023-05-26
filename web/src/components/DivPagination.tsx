import "../styles/DivPagination.css"

interface IDivPaginationProps{
  functionToBack: () => void,
  functionToNext: () => void,
  currentPage: number,
  totalThisPage: number
}

function DivPagination({functionToBack, functionToNext, currentPage, totalThisPage}:IDivPaginationProps){

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
      {
        (totalThisPage === 6) ?
        <button onClick={functionToNext}>
          Próxima &gt;&gt;&gt;
        </button>
        :
        <></>
      }
    </div>
  )
}

export default DivPagination