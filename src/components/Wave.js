import React from "react";

export default function Wave (props) {
  return (
    <path
      d={`M ${props.initialX} ${props.initialY} C ${props.waveX} ${props.waveY} ${props.opwaveX} ${props.opwaveY} ${props.nextX} ${props.nextY}`}
      fill="none"
      stroke="red"
      strokeWidth={40}
    ></path>
  );
};