import React, { useEffect, useMemo, useState } from "react";
import "./index.css";
import { useMusicList } from "../../context/MusicContext";
import { NavigateNext } from "@mui/icons-material";
import { Table } from "antd";
import { normalizeTime } from "../utils";



function Details() {
  const { collection } = useMusicList();
  const [collectionDetails, setCollectionDetails] = useState([]);
  const [loading, setLoading] = useState(false);
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
        <div
          style={{
            height: "48px",
            fontSize: "12px",
            fontWeight: 500,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "30px",
          }}
        >
          <span>Overview</span> <NavigateNext />
          <span> {collection.collectionname}</span>
        </div>
        <div
          style={{
            fontSize: "24px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            paddingLeft: "30px",
            backgroundColor: "#FFF",
            height: "68px",
          }}
        >
          <span>
            {`${collection.type === "EP" ? "EPIC" : collection.type} :  `}
          </span>
          <span style={{ marginLeft: "5px" }}>
            {" "}
            {collection.collectionname}
          </span>
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
        </div>
      </div>
    </div>
  );
}

export default Details;
