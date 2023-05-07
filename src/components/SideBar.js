import React, { useState } from "react";

import "../styles/SideBar.css";

import { AiFillSetting } from "react-icons/ai";
import { MdMoreVert } from "react-icons/md";
import { MdAddCircleOutline, MdDownload } from "react-icons/md";

export default function SideBar(props) {
  const [checked, setChecked] = useState(true);
  const handleChange = (type, n) => {
    props.handleChange(type, n);
  };

  return (
    <div className="Side-Bar">
      <div className="Avatar-container-div">
        <div className="Avatar-container">
          <button className="Avatar-btn">
            <img className="Avatar" src="" alt="" />
          </button>
        </div>

        <button className="Setting-btn">
          <MdMoreVert size="4em" className="Setting-dot" color="white" />
        </button>
      </div>
      <div className="Layers-container">
        <h1 className="Layer-title">Layers</h1>
        <div className="Layers">{props.LayerGroup}</div>
      </div>
      <div className="AddDownloadBtnDiv">
        <button
          className="AddLayerBtn"
          onClick={() => handleChange("AddLayer", 1)}
          disabled={props.Alert}
        >
          Add Layer
          <MdAddCircleOutline className="AddLayerIcon" />
        </button>
        <button className="DownloadBtn" disabled={props.Alert}>
          Download
          <MdDownload className="DownloadIcon" />
        </button>
      </div>
      <div className="ACG">
        <input
          className="ACG-btn"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        ></input>
        <span className="ACG-title">AUTO COLORING</span>
        <div className="Setting-icon">
          <AiFillSetting />
        </div>
      </div>
    </div>
  );
}
