import React, { useState,Fragment } from "react";
import reactCSS from "reactcss";

import { MdDelete, MdSettingsEthernet } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiOutlineReload } from "react-icons/ai";
import { ChromePicker } from "react-color";

import "../styles/Layers.css";

export default function Layer(props) {
  const CurrentColor = props.StrokeColor;
  const [DisplayColorPicker, SetDisplayColorpicker] = useState(false);
  const [MoreShown, SetMoreShown] = useState(false);
  const ColorStyles = reactCSS({
    default: {
      ChangeColor: {
        minWidth: "100%",
        minHeight: "1rem",

        background: `rgba(${CurrentColor.r},${CurrentColor.g},${CurrentColor.b},${CurrentColor.a})`,
      },
      ChangeHidden: {
        // position: "fixed",
        cursor: "pointer",
        zIndex: 2,
        // background: "blue",
        visibility: `${props.Visibility}`,
        width: "100%",
        height: "1.4rem",
      },
    },
  });
  const LayerClassName =
    props.Order === props.ActiveLayer
      ? "Layer-container Layer-active"
      : "Layer-container";

  const handleChangeComplete = (color) => {
    props.handleChange("Color", color.rgb);
  };

  const LayerSelected = () => {
    if (props.Disabled === false) {
      if (props.ActiveLayer !== props.Order) {
        props.LayerSelected(props.Order);
      }
    }
  };

  const handleChange = (type, n) => {
    props.handleChange(type, n);
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
      </button>
      {DisplayColorPicker ? (
        <Fragment>
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
        </Fragment>
      ) : null}
      <div className="layer-buttons">
        <button className="layer-buttonShow">
          <AiOutlineReload
            className="layer-icon layer-random"
            onClick={() => {
              handleChange("Reload", 0);
            }}
          />
        </button>
        <button className="layer-buttonShow">
          {props.SvgVisibility === "visible" ? (
            <AiFillEye
              className="layer-icon layer-visibility"
              onClick={() => {
                props.handleChange("Visibility", 0);
              }}
            />
          ) : (
            <AiFillEyeInvisible
              className="layer-icon layer-visibility"
              onClick={() => {
                handleChange("Visibility", 0);
              }}
            />
          )}
        </button>
        <button className="layer-buttonShow">
          <MdDelete
            className="layer-icon layer-delete"
            onClick={() => {
              handleChange("DelLayer", props.Order);
            }}
          />
        </button>
        <button className="layer-more">
          <MdSettingsEthernet
            className="layer-icon"
            onClick={() => {
              SetMoreShown(true);
            }}
          />
        </button>
        {MoreShown ? (
          <>
            <div
              className="cover"
              onClick={() => {
                SetMoreShown(false);
              }}
            ></div>
            <div className="DefaultSizeBtns">
              <button className="layer-button">
                <AiOutlineReload
                  className="layer-icon layer-random"
                  onClick={() => {
                    handleChange("Reload", 0);
                  }}
                />
              </button>
              <button className="layer-button">
                {props.SvgVisibility === "visible" ? (
                  <AiFillEye
                    className="layer-icon layer-visibility"
                    onClick={() => {
                      props.handleChange("Visibility", 0);
                    }}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className="layer-icon layer-visibility"
                    onClick={() => {
                      handleChange("Visibility", 0);
                    }}
                  />
                )}
              </button>
              <button className="layer-button">
                <MdDelete
                  className="layer-icon layer-delete"
                  onClick={() => {
                    handleChange("DelLayer", props.Order);
                  }}
                />
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
