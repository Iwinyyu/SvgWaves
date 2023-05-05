import React from "react";


export default function Segment(props) {
  
  return (
    <path
      d={`M 0 0 L ${props.x} ${props.y}`}
      fill="none"
      stroke="black"
      strokeWidth="4px"
    ></path>
  );
}
