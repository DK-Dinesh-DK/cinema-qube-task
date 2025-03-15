import React, { useState } from "react";
import "./index.css";

import { TextField, InputAdornment, GlobalStyles } from "@mui/material";
import { KeyboardArrowDown, SearchOutlined } from "@mui/icons-material";

function Dashboard() {
  const [type, setType] = useState([]);


  return (
    <div className="dashboard-container">
      <div className="header">Overview</div>
      <div className="table-container">
        <div className="filter-container">
          <div>
            <GlobalStyles
              styles={{
                "input[type='password']::-ms-reveal, input[type='password']::-ms-clear":
                  {
                    display: "none",
                  },
                "input[type='password']::-webkit-clear-button, input[type='password']::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "input:-internal-autofill-selected": {
                  appearance: "menulist-button",
                  backgroundColor: "transparent !important",
                  backgroundImage: "none !important",
                  color: "inherit !important",
                  padding: 0,
                },
                "input:-webkit-autofill": {
                  boxShadow: "0 0 0px 1000px white inset !important",
                  backgroundColor: "transparent !important",
                  color: "#000 !important",
                },
              }}
            />
            <TextField
              variant="outlined"
              placeholder="Search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
              sx={{
                height: "34px",
                width: "310px",
                backgroundColor: "#FFF",
                borderRadius: "6px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#d9d9d9",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1677ff",
                  },
                },
                "& .MuiInputBase-root": {
                  height: "34px",
                  width: "310px",
                  fontSize: "14px",
                  lineHeight: "1.57",
                },
              }}
            />
          </div>

          <div>
            <button
              className={
                type.length > 0 ? "type-selected-button" : "type-button"
              }
            >
              {type.length > 0 ? `Type (${type.length})` : "Type"}{" "}
              <KeyboardArrowDown
                style={{ color: "#08090A", fontSize: "18px" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
