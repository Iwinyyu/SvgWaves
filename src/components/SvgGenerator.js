import React from "react";
import reactCSS from "reactcss";

export default function SvgGenerator(props) {
  const style = reactCSS({
    default: {
      visualpath: {
        animation: `${props.Direction} infinite ${
          props.Speed !== 0 ? 11 - props.Speed : 0
        }s linear`,
      },
    }, 
  });

  return (
    
    <svg
      className="visual"
      viewBox={`0 0 ${props.SVG_W} ${props.SVG_H}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={`${props.SVG_W}`}
      height={`${props.SVG_H}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`translate(${props.SVG_trans_W} ${props.SVG_trans_H})`}>
        {
          <path
            className={`visualpath Layer${props.Order}`}
            style={style.visualpath}
            d={`${props.rootSvg}`}
            fill={`${props.fill}`}
            stroke={`rgba(${props.color.r},${props.color.g},${props.color.b},${props.color.a})`}
            strokeWidth={`${props.width}`}
            visibility={`${props.Visibility}`}
          ></path>
        }
      </g>
    </svg>
  );
}
