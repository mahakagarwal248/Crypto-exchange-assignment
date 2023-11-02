import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

function PaginationComp({ param, setParam, totalCount }) {
  const count = Math.floor(totalCount / 10);
  const pageNumbers = Array.from({ length: count }, (_, i) => i + 1);
  const itemsPerPage = 5; // Number of page items to display

  const [activePage, setActivePage] = useState(1);

  let startPage = Math.max(1, activePage - Math.floor(itemsPerPage / 2));
  const endPage = Math.min(startPage + itemsPerPage - 1, count);
  startPage = Math.max(1, endPage - itemsPerPage + 1);

  const handleClick = (e, page) => {
    setActivePage(page);
    let { pageNumber } = param;
    pageNumber = page - 1;
    setParam({ ...param, pageNumber });
  };
  const handleNext = (e) => {
    if (activePage < count + 1) {
      setActivePage(activePage + 1);
      let { pageNumber } = param;
      pageNumber = activePage;
      setParam({ ...param, pageNumber });
    }
  };
  const handlePrevious = (e) => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
      let { pageNumber } = param;
      pageNumber = activePage - 2;
      setParam({ ...param, pageNumber });
    }
  };
  return (
    <Pagination
      style={{
        width: "50%",
        margin: "auto",
        justifyContent: "center",
        marginBottom: "10px",
      }}
    >
      <Pagination.Prev
        onClick={(e) => handlePrevious(e)}
        disabled={activePage === 1}
        style={{ margin: "5px" }}
      />
      {pageNumbers.slice(startPage - 1, endPage).map((page) => (
        <Pagination.Item
          key={page}
          onClick={(e) => handleClick(e, page)}
          active={page === activePage}
          style={{ margin: "5px" }}
        >
          {page}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={(e) => handleNext(e)}
        disabled={activePage === count}
        style={{ margin: "5px" }}
      />
    </Pagination>
  );
}

export default PaginationComp;
