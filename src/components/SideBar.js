import React, { useState, Fragment } from "react";

import "../styles/SideBar.css";

import { MdAddCircleOutline, MdDownload } from "react-icons/md";

import { ChromePicker } from "react-color";
import reactCSS from "reactcss";

export default function SideBar(props) {
  const CurrentColor = props.bgColor;

  const [DisplayColorPicker, SetDisplayColorpicker] = useState(false);
  const ColorStyles = reactCSS({
    default: {
      ChangeColor: {
        minWidth: "0.6rem",
        minHeight: "0.6rem",
        maxWidth: "1rem",
        maxHeight: "1rem",
        width: "3vw",
        height: "3vw",

        background: `rgba(${CurrentColor.r},${CurrentColor.g},${CurrentColor.b},${CurrentColor.a})`,
      },
      ChangeHidden: {
        position: "absolute",
        cursor: "pointer",
        zIndex: 2,
        background: "transparent",
        visibility: `${props.Visibility}`,
        width: "90%",
        height: "1.4rem",
      },
    },
  });

  const handleChange = (type, n) => {
    props.handleChange(type, n);
  };

  return (
    <div className="Side-Bar">
      
      <div className="Layers-container">
        <h1 className="Layer-title">Layers</h1>
        <div className="Layers">{props.LayerGroup}</div>
      </div>

      <div className="AddDownloadBtnDiv">
        <div className="bgColor">
          <button
            className="backColor"
            disabled={props.Disabled}
            onClick={() => SetDisplayColorpicker(true)}
          >
            <span className="bgtext">Background Color</span>
            <div className="colorSquare" style={ColorStyles.ChangeColor}></div>
          </button>
          {DisplayColorPicker ? (
        <Fragment>
          <div
            className="coverSide"
            onClick={() => {
              SetDisplayColorpicker(false);
            }}
          ></div>
          <ChromePicker
            className="color-pickerSide"
            color={CurrentColor}
            onChange={(color) => handleChange("bgColor", color.rgb)}
          />
        </Fragment>
      ) : null}
        </div>
        <button
          className="AddLayerBtn"
          onClick={() => handleChange("AddLayer", 1)}
          disabled={props.Disabled}
        >
          Add Layer
          <MdAddCircleOutline className="AddLayerIcon" />
        </button>
        <button
          className="DownloadBtn"
          onClick={() => {
            handleChange("Download", 1);
          }}
          disabled={props.Disabled}
        >
          Download
          <MdDownload className="DownloadIcon" />
        </button>
      </div>
    </div>
  );
}
