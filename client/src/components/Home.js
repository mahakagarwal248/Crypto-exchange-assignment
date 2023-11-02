import DataTable from "./DataTable";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { useState } from "react";
import PaginationComp from "./Pagination";

function Home() {
  const [param, setParam] = useState({
    pageNumber: 0,
    limit: 10,
    searchTerm: "",
  });
  const [totalCount, setTotalCount] = useState(0);
  return (
    <div>
      <Header param={param} setParam={setParam} totalCount={totalCount} />
      <br />
      <div style={{ borderBottom: "1px solid grey" }}>
        <h6
          style={{
            paddingBottom: "12px",
            borderBottomStyle: "solid",
            borderBottomWidth: "3.1px",
            borderBottomColor: "blue",
            width: "fit-content ",
            margin: "auto",
            color: "blue",
          }}
        >
          Exchanges
        </h6>
      </div>
      <br />
      <SearchBar param={param} setParam={setParam} />
      <br />
      <DataTable
        param={param}
        setParam={setParam}
        setTotalCount={setTotalCount}
      />
      <br />
      <PaginationComp param={param} setParam={setParam} totalCount={totalCount} />
    </div>
  );
}

export default Home;
