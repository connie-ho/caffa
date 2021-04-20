import Pagination from '@material-ui/lab/Pagination';


const Paginations = ({coffeesPerPage, totalCoffees, page, setPage}) => {

  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalCoffees/coffeesPerPage); i ++){
    pageNumbers.push(i);
  }
  

  const handleChange = (event,value) => {
    setPage(value)
  };

  return (

    <Pagination style={{margin:'1em'}} color="primary" boundaryCount={2} count={pageNumbers[pageNumbers.length-1]} page={page} onChange={handleChange}  />
  );


}

export default Paginations;