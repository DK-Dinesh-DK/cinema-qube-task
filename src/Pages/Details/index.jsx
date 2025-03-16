import React, { useEffect, useMemo, useState } from "react";
import "./index.css";
import { useMusicList } from "../../context/MusicContext";
import { NavigateNext } from "@mui/icons-material";
import { Table } from "antd";
import { normalizeTime } from "../utils";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

function Details() {
  const { collection } = useMusicList();
  const [collectionDetails, setCollectionDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        title: "Song",
        dataIndex: "song",
        key: "song",
      },
      {
        title: "Performers ",
        dataIndex: "Performers",
        key: "Performers",
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
    ],
    []
  );

  const getDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dinesh-motors.onrender.com/cinema-qube/collections/${collection.id}`
      );
      const response = await res.json();
      console.log("response", response);
      setCollectionDetails(response.list[0].songs);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("ERROR", err);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div className="details-main-container">
      <div className="details-page-header">
        <div className="bread-scrum-container">
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Overview
          </span>{" "}
          <NavigateNext />
          <span> {collection.collectionname}</span>
        </div>
        <div className="title-content">
          <span>
            {`${collection.type === "EP" ? "EPIC" : collection.type} :  `}
          </span>
          <span style={{ marginLeft: "5px" }}>{collection.collectionname}</span>
        </div>
      </div>
      <div className="content-container">
        <div className="details-row">
          <div>
            <div className="detail-head">Artist</div>
            <div className="detail-data">{collection.ArtistName}</div>
          </div>
          <div>
            <div className="detail-head">Type</div>
            <div className="detail-data">{collection.type}</div>
          </div>
          <div>
            <div className="detail-head">Song Count</div>
            <div className="detail-data">{collection.count}</div>
          </div>
          <div>
            <div className="detail-head">Total Size</div>
            <div className="detail-data">{collection.size}</div>
          </div>
          <div>
            <div className="detail-head">Total Duration</div>
            <div className="detail-data">
              {normalizeTime(collection.duration)}
            </div>
          </div>
          <div>
            <div className="detail-head">Released On</div>
            <div className="detail-data">{collection.release}</div>
          </div>
        </div>
        <div>
          {!loading && (
            <Table
              dataSource={collectionDetails}
              columns={columns}
              pagination={false}
              style={{ height: "100%", overflow: "auto", borderRadius: "10px" }}
              scroll={{
                y: "calc(100vh - 321px)",
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

export default Details;
