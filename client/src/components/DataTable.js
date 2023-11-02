import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getData } from "../libs/apiEndpoints";
import "./DataTable.css";

export default function DataTable({ param, setParam, setTotalCount }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getData(param)
      .then((data) => data.data)
      .catch((err) => {
        console.log("🚀 ~ file: DataTable.js:20 ~ fetchData ~ err:", err)
      });
    setData(res.data);
    setTotalCount(res.totalCount);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 400, width: "50%", margin: "auto" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell className="heading">EXCHANGE</TableCell>
            <TableCell align="left" width="30%" className="heading">
              24H TRADE VOLUME
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} align="center">
                No Data Found
              </TableCell>
            </TableRow>
          ) : (
            data?.map((row) => (
              <TableRow
                key={row?.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={row.imageUrl || '/default.png'}
                    alt="icon"
                    style={{ marginRight: "10px", verticalAlign: "middle", width:'35px', height:"35px" }}
                  />
                  {row?.name}
                </TableCell>
                <TableCell align="left" width="30%">
                  {row?.volume_1day_usd}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
