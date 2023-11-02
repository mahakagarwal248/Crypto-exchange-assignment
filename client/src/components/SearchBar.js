import React, { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
import "./SearchBar.css";

export default function SearchBar({ param, setParam }) {
  const [serach, setSearch] = useState("");
  const handleOnClick = (e) => {
    setSearch(e.target.value);
  };
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <FormControl variant="standard" className="search-box">
        <Input
          id="input-with-icon-adornment"
          value={serach}
          onChange={(e) => handleOnClick(e)}
          startAdornment={
            <InputAdornment position="start">
              <BusinessIcon />
            </InputAdornment>
          }
          placeholder="Find an exchange"
          endAdornment={
            <InputAdornment position="end">
              <span
                onClick={() => {
                  setParam({ ...param, searchTerm: serach, pageNumber: 0 });
                }}
              >
                <SearchIcon className="search-icon" />
              </span>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
