import React, { useState } from "react";
import "../styles/BottomBar.css";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

export default function BottomBar(props) {
  const [Width, SetWidth] = useState(props.size);
  const [StrokeW, SetStokeW] = useState(props.StrokeW);
  const [Complexity, SetComplexity] = useState(props.Complexity);
  const [Segments, SetSegments] = useState(props.Segments);
  const [Radius, SetRadius] = useState(props.Radius);
  const [Speed, SetSpeed] = useState(props.Speed);
  function handleChange(type, n) {
    props.handleChange(type, Number(n));
  }
  return (
    <div className="Bottom-Bar">
      <div className="Canvas-Size">
        <h1 className="Canvas_Title">Canvas</h1>
        <div className="Canvas-W-H">
          <div className="W-size">
            <span>Size</span>
            <div className="input-container">
              <input
                className="var-inputs"
                value={Width}
                onChange={(event) => SetWidth(event.target.value)}
                onBlur={(event) => handleChange("Size", event.target.value)}
                disabled={props.Disabled}
              ></input>
              <span>px</span>
            </div>
          </div>

          <div className="strokeWidth">
            <span>Stroke Width</span>
            <div className="input-container">
              <input
                className="var-inputs"
                value={StrokeW}
                onChange={(event) => SetStokeW(event.target.value)}
                onBlur={(event) =>
                  handleChange("StrokeWidth", event.target.value)
                }
                disabled={props.Disabled}
              ></input>
              <span>px</span>
            </div>
          </div>
        </div>
      </div>
      <div className="Svg-Variables">
        <h1 className="Variable-Title">Variables</h1>
        <div className="Variables">
          <span className="V-Complexity">Complexity</span>
          <input
            className="Variable-Input"
            type="range"
            min={0}
            value={Complexity}
            max={10}
            onChange={(event) => {
              SetComplexity(event.target.value);
              handleChange("Complexity", event.target.value);
            }}
            disabled={props.Disabled}
          ></input>
        </div>

        <div className="Variables">
          <span className="V-Segments">Waves</span>
          <input
            className="Variable-Input"
            type="range"
            min={3}
            value={Segments}
            max={17}
            onChange={(event) => {
              SetSegments(event.target.value);
              handleChange("Segments", event.target.value);
            }}
            disabled={props.Disabled}
          ></input>
        </div>

        <div className="Variables">
          <span className="V-Size">Ridius</span>
          <input
            className="Variable-Input"
            type="range"
            min={1}
            value={Radius}
            max={11}
            onChange={(event) => {
              SetRadius(event.target.value);
              handleChange("Radius", event.target.value);
            }}
            disabled={props.Disabled}
          ></input>
        </div>
      </div>
      <div className="Rotations">
        <h1 className="Rotation-Title">Rotations</h1>
        <div className="Rotation">
          <span className="R-Speed">Speed</span>
          <input
            className="Variable-Input"
            type="range"
            min={0}
            value={Speed}
            max={10}
            onChange={(event) => {
              SetSpeed(event.target.value);
              handleChange("Speed", event.target.value);
            }}
            disabled={props.Disabled}
          ></input>
        </div>
        <div className="Rotation">
          <span className="R-Speed">Direction</span>
          <div className="Direction-Buttons">
            <button
              className="Direction-Button Left"
              onClick={() => {
                handleChange("Direction", 0);
              }}
              disabled={props.Disabled}
            >
              <BsFillArrowLeftSquareFill className="Direction-Icon Left" />
            </button>
            <button
              className="Direction-Button Right"
              onClick={() => {
                handleChange("Direction", 1);
              }}
              disabled={props.Disabled}
            >
              <BsFillArrowRightSquareFill className="Direction-Icon right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
