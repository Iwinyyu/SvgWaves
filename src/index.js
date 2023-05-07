import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import SvgGenerator from "./components/SvgGenerator";
import BottomBar from "./components/BottomBar";
import SvgDrawing from "./functions/Svgdrawing";
import SideBar from "./components/SideBar";
import Layers from "./components/Layers";
import "./styles/index.css";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import WaveJSON from "./components/waves.json";

function Main() {
  const [CurrentActiveLayer, SetActiveLayer] = useState(null);
  const [VariableChanged, SetVariableChanged] = useState(false);
  const [LayerLevels, SetLayerLevels] = useState(2);
  const [AlertShown, SetAlert] = useState(false);

  const InputEnable = CurrentActiveLayer === null ? true : false;

  let LayerGroup = [];

  function recalculate(type) {
    if (type) {
      for (let i = 0; i < LayerLevels; i++) {
        SvgDrawing(i + 1, WaveJSON[0].SvgWave[i]);
      }
    } else {
      SvgDrawing(
        CurrentActiveLayer,
        WaveJSON[0].SvgWave[Number(CurrentActiveLayer) - 1]
      );
    }
  }

  for (let i = 0; i < LayerLevels; i++) {
    if (WaveJSON[0].SvgWave.length < LayerLevels) {
      SvgDrawing(WaveJSON[0].SvgWave.length + 1);
    }

    LayerGroup.push(
      <Layers
        key={`layer ${i}`}
        Order={WaveJSON[0].SvgWave[i].Order}
        StrokeColor={WaveJSON[0].SvgWave[i].StrokeColor}
        LayerSelected={LayerSelected}
        ActiveLayer={CurrentActiveLayer}
        Alert={AlertShown}
        Visibility={Number(CurrentActiveLayer) === i + 1 ? "hidden" : "visible"}
        handleChange={handleChange}
      />
    );
  }

  let WaveJ = WaveJSON[0].SvgWave;

  let SvgGroup = [];
  for (let i = WaveJ.length - 1; i >= 0; i--) {
    SvgGroup.push(
      <SvgGenerator
        key={`element${i}`}
        Order={`${i}`}
        SVG_W={WaveJ[i].CanvasWidth}
        SVG_H={WaveJ[i].CanvasWidth}
        SVG_trans_W={WaveJ[i].TranslateWidth}
        SVG_trans_H={WaveJ[i].TranslateHeight}
        rootSvg={WaveJ[i].PathD}
        fill={WaveJ[i].PathFill}
        color={WaveJ[i].StrokeColor}
        width={WaveJ[i].StrokeWidth}
        Speed={WaveJ[i].Speed}
        Direction={WaveJ[i].Direction}
      />
    );
  }

  function handleChange(type, n) {
    switch (type) {
      case "Size":
        if (WaveJ[Number(CurrentActiveLayer) - 1].CanvasWidth !== n) {
          WaveJ.forEach((Element) => (Element.CanvasWidth = n));
          recalculate(type);
          SetVariableChanged(!VariableChanged);
        }
        break;
      case "Complexity":
        WaveJ[Number(CurrentActiveLayer) - 1].Complicity = n / 10;
        recalculate();
        SetVariableChanged(!VariableChanged);
        break;
      case "StrokeWidth":
        WaveJ[Number(CurrentActiveLayer) - 1].StrokeWidth = n;
        SetVariableChanged(!VariableChanged);
        break;
      case "Radius":
        WaveJ[Number(CurrentActiveLayer) - 1].SetRadius = n / 10;
        recalculate();
        SetVariableChanged(!VariableChanged);
        break;
      case "Segments":
        WaveJ[Number(CurrentActiveLayer) - 1].Segments = n;
        recalculate();
        SetVariableChanged(!VariableChanged);
        break;
      case "Color":
        WaveJ[Number(CurrentActiveLayer) - 1].StrokeColor = n;
        SetVariableChanged(!VariableChanged);
        break;
      case "Speed":
        WaveJ[Number(CurrentActiveLayer) - 1].Speed = n;
        SetVariableChanged(!VariableChanged);
        break;
      case "Direction":
        WaveJ[Number(CurrentActiveLayer) - 1].Direction =
          n === 1 ? "spin" : "spinBack";
        SetVariableChanged(!VariableChanged);
        break;
      case "AddLayer":
        if (LayerLevels < 7) {
          SetLayerLevels(LayerLevels + 1);
        } else {
          SetAlert(true);
        }
        break;
      default:
        break;
    }
  }

  function LayerSelected(Order) {
    SetActiveLayer(Order);
  }

  let BottomBarGroup = [];
  for (let i = 0; i < WaveJ.length; i++) {
    BottomBarGroup.push(
      <BottomBar
        SetVariableChanged={SetVariableChanged}
        handleChange={handleChange}
        size={WaveJ[i].CanvasWidth}
        StrokeW={WaveJ[i].StrokeWidth}
        Segments={WaveJ[i].Segments}
        Complexity={WaveJ[i].Complexity * 10}
        Radius={WaveJ[i].SetRadius * 10}
        Speed={WaveJ[i].Speed}
        InputEnable={InputEnable}
        Alert={AlertShown}
        key={CurrentActiveLayer}
      />
    );
  }

  return (
    <div className="main">
      {AlertShown ? (
        <Alert
          className="alert"
          severity="info"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                SetAlert(false);
              }}
            >
              CLOSE
            </Button>
          }
        >
          Maxmium 7 layers
        </Alert>
      ) : null}
      <div className="SVG-cover">
        <div className="SVG">{SvgGroup}</div>
      </div>
      <div className="Side">
        <SideBar
          LayerGroup={LayerGroup}
          handleChange={handleChange}
          Alert={AlertShown}
        />
      </div>
      <div className="Bottom">
        {BottomBarGroup[Number(CurrentActiveLayer) - 1] ? (
          BottomBarGroup[Number(CurrentActiveLayer) - 1]
        ) : (
          <h1 className="Filling-Text">Please select a layer</h1>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
