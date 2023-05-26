import "../../styles/ListCandidacy.css";

export default function ListCandidacy() {
  return (
    <div className="ListCandidacy">
      <table className="body-list-candidacy">
        <tr className="headear-table-list-candidacy">
          <th>Titulo</th>
          <th>Orientador</th>
          <th>Situação</th>
          <th></th>
        </tr>
        <tr className="row-table-list-candidacy">
          <td className="td-first-list-candidacy">
            <span>{'<Titulo da IC>'}</span>
            <span>{'<status>'}</span>
          </td>
          <td>
            <span>{'<Orientador>'}</span>
          </td>
          <td>
            <span>Pendente</span>
          </td>
          <td className="td-last-list-candidacy">
            <span>Teste</span>
          </td>
        </tr>
      </table>
    </div>
  );
}