import React, { useState } from "react";
import reactCSS from "reactcss";

import { MdDelete } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiOutlineReload } from "react-icons/ai";
import { ChromePicker } from "react-color";

import "../styles/Layers.css";

export default function Layer(props) {
  const [CurrentColor, SetCurrentColor] = useState(props.StrokeColor);
  const [DisplayColorPicker, SetDisplayColorpicker] = useState(false);
  const ColorStyles = reactCSS({
    default: {
      ChangeColor: {
        minWidth: "7rem",
        minHeight: "1rem",

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
  const LayerClassName =
    props.Order === props.ActiveLayer
      ? "Layer-container Layer-active"
      : "Layer-container";

  const handleChangeComplete = (color) => {
    SetCurrentColor(color.rgb);
    console.log(color.rgb)
    props.handleChange("Color", color.rgb);
  };

  const LayerSelected = () => {
    props.LayerSelected(props.Order);
  };

  return (
    <div className={LayerClassName} onClick={() => LayerSelected()}>
      <div className="layer-overlay" style={ColorStyles.ChangeHidden}></div>
      <div className="layer-order">{props.Order}</div>
      <button
        className="layer-color"
        onClick={() => SetDisplayColorpicker(true)}
      >
        <div className="color-square" style={ColorStyles.ChangeColor}></div>
        {/* <span className="color-name">{CurrentColor}</span> */}
      </button>
      {DisplayColorPicker ? (
        <>
          <div
            className="cover"
            onClick={() => {
              SetDisplayColorpicker(false);
            }}
          ></div>
          <ChromePicker
            className="color-picker"
            color={CurrentColor}
            onChange={(color) => handleChangeComplete(color)}
          />
        </>
      ) : null}
      <div className="layer-buttons">
        <button className="layer-button">
          <AiOutlineReload color="white" className="layer-icon layer-random" />
        </button>
        <button className="layer-button">
          <AiFillEye color="white" className="layer-icon layer-visibility" />
        </button>
        <button className="layer-button">
          <MdDelete color="white" className="layer-icon layer-delete" />
        </button>
      </div>
    </div>
  );
}
