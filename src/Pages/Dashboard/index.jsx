import React, { useEffect, useMemo, useState } from "react";
import {
  TextField,
  InputAdornment,
  GlobalStyles,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  KeyboardArrowDown,
  SearchOutlined,
  Visibility,
} from "@mui/icons-material";
import { Table } from "antd";
import "./index.css";
import { useMusicList } from "../../context/MusicContext";
import { useNavigate } from "react-router";
import { normalizeTime } from "../utils";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tableDataOriginal, setTableDataOriginal] = useState([]);
  const { handleCollection } = useMusicList();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = ["Single", "EP", "Album"];
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        title: "Collection Name",
        dataIndex: "collectionname",
        key: "collectionname",
        render: (text, row) => {
          console.log(text, "0", row);
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>{text}</span>
              <span style={{ color: "#677A90" }}>{row.ArtistName}</span>
            </div>
          );
        },
      },
      {
        title: "Type ",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Song Count",
        dataIndex: "count",
        key: "count",
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
        render: (text) => normalizeTime(text),
      },
      {
        title: "Size",
        dataIndex: "size",
        key: "size",
      },
      {
        title: "Released On",
        dataIndex: "release",
        key: "releasedon",
      },
      {
        title: " ",
        render: (text, row) => {
          return (
            <div
              onClick={() => {
                navigate("/collection-details");
                handleCollection(row);
              }}
              style={{
                cursor: "pointer",
                display: "flex",
                columnGap: "5px",
                alignItems: "center",
              }}
            >
              <span>
                <Visibility style={{ color: "#025992" }} />
              </span>{" "}
              <span
                style={{ color: "#025992", fontSize: "12px", fontWeight: 500 }}
              >
                View Details
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const handleMenu = (val) => {
    if (type?.includes(val)) {
      setType(type.filter((prev) => prev !== val));
    } else {
      setType([...type, val]);
    }
  };

  const getCollections = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://dinesh-motors.onrender.com/cinema-qube/collections"
      );
      const response = await res.json();
      setTableData(response.collection);
      setTableDataOriginal(response.collection);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("ERROR", err);
    }
  };

  useEffect(() => {
    let sample = tableDataOriginal;
    if (String(searchData).trim() !== "" && searchData) {
      sample = sample?.filter((i) => {
        if (
          String(i.ArtistName)
            .toLowerCase()
            .includes(String(searchData).trim().toLowerCase()) ||
          String(i.collectionname)
            .toLowerCase()
            .includes(String(searchData).trim().toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    }
    if (type.length > 0) {
      sample = sample.filter((i) => type.includes(i.type));
    }

    setTableData([...sample]);
  }, [searchData, type]);

  console.log("tableData", tableData);
  useEffect(() => {
    getCollections();
  }, []);
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
              onChange={(e) => setSearchData(e.target.value)}
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
              onClick={handleClick}
              className={
                type.length > 0 ? "type-selected-button" : "type-button"
              }
            >
              {type.length > 0 ? `Type (${type.length})` : "Type"}{" "}
              <KeyboardArrowDown
                style={{ color: "#08090A", fontSize: "18px" }}
              />
            </button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                "& .MuiPaper-root": {
                  minWidth: "210px",
                  borderRadius: "10px",
                  padding: "5px",
                },
              }}
            >
              {options.map((option, index) => (
                <MenuItem key={index} onClick={() => handleMenu(option)}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "10px",
                    }}
                  >
                    <span>
                      <input
                        type="checkbox"
                        style={{ height: "16px", width: "16px" }}
                        checked={type?.includes(option)}
                      />
                    </span>
                    <span style={{ fontSize: "14px" }}> {option}</span>
                  </div>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <div className="table-block">
          {!loading && (
            <Table
              dataSource={tableData}
              columns={columns}
              pagination={false}
              style={{ height: "100%", overflow: "auto", borderRadius: "10px" }}
              scroll={{
                y: "calc(100vh - 230px)",
              }}
              rowClassName={() => "custom-row"}
            />
          )}
          {loading && <CircularProgress />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
