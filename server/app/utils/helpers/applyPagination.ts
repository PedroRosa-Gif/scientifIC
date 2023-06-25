export function applyPagination(array:any[], currentPage:number, totalPerPage:number){
  const pageIndex = (currentPage - 1) * totalPerPage
	return array.slice(pageIndex, pageIndex + totalPerPage);
}