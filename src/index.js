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

import Download from "./functions/Download";

import WaveJSON from "./components/waves.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MdClose, MdDownload } from "react-icons/md";

import reactCSS from "reactcss";



const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "rgba(255,255,255,1)",
      darker: "#053e85",
    },
    neutral: {
      main: "rgba(255,255,255,1)",
      contrastText: "rgba(0,0,0,1)",
    },
  },
});

function Main() {
  const [CurrentActiveLayer, SetActiveLayer] = useState(null);
  const [VariableChanged, SetVariableChanged] = useState(false);
  const [LayerLevels, SetLayerLevels] = useState(1);
  const [AlertShown, SetAlert] = useState(false);
  const [DownloadShown, SetDownload] = useState(false);
  let FunctionDisabled = AlertShown || DownloadShown;

  let backColor = WaveJSON[0].SvgFactor[0].bgColor

  const Colors = reactCSS({
    default: {
      ChangeColor: {

        background: `rgba(${backColor.r},${backColor.g},${backColor.b},${backColor.a})`,
      },
    },
  });

  let LayerGroup = [];

  function recalculate(type) {
    if (type === "Size") {
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
  function reorder(n) {
    for (let i = 0; i < LayerLevels - n; i++) {
      WaveJSON[0].SvgWave[i].Order = i + 1;
    }
  }

  for (let i = 0; i < LayerLevels; i++) {
    if (WaveJSON[0].SvgWave.length < LayerLevels) {
      SvgDrawing(WaveJSON[0].SvgWave.length + 1);
    }
    LayerGroup.push(
      <Layers
        key={`layer${i}`}
        Order={WaveJSON[0].SvgWave[i].Order}
        StrokeColor={WaveJSON[0].SvgWave[i].StrokeColor}
        LayerSelected={LayerSelected}
        ActiveLayer={CurrentActiveLayer}
        Disabled={FunctionDisabled}
        SvgVisibility={WaveJSON[0].SvgWave[i].Visibility}
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
        Visibility={WaveJ[i].Visibility}
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
        WaveJ[Number(CurrentActiveLayer) - 1].Complexity = n / 10;
        console.log(n / 10);
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
        case "bgColor":
          WaveJSON[0].SvgFactor[0].bgColor = n;
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
      case "DelLayer":
        WaveJ.splice(n - 1, 1);
        reorder(1);
        SetActiveLayer(null);
        SetLayerLevels(LayerLevels - 1);
        break;
      case "Reload":
        recalculate();
        SetVariableChanged(!VariableChanged);
        break;
      case "Visibility":
        WaveJ[Number(CurrentActiveLayer) - 1].Visibility =
          WaveJ[Number(CurrentActiveLayer) - 1].Visibility === "visible"
            ? "hidden"
            : "visible";
        SetVariableChanged(!VariableChanged);
        break;
      case "Download":
        SetDownload(true);
        SetVariableChanged(!VariableChanged);
        break;
      case "DownloadSVG":
        Download("SVG", LayerLevels);
        break;
      case "DownloadPNG":
        Download("PNG", LayerLevels);

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
        Disabled={FunctionDisabled}
        key={i}
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
      {DownloadShown ? (
        <div className="DownloadOptions">
          <div className="DownloadTopbar">
            <h2 className="DownloadTitle">DOWNLOAD OPTIONS</h2>
            <button
              className="CloseDownload"
              onClick={() => SetDownload(false)}
            >
              <MdClose color="white" size="2em" />
            </button>
          </div>
          <div className="Options">
            <ThemeProvider theme={theme}>
              <Button
                className="DownloadSVGBtn"
                variant="contained"
                color="neutral"
                sx={{
                  width: 100,
                }}
                onClick={() => handleChange("DownloadSVG", 1)}
              >
                SVG
                <MdDownload />
              </Button>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Button
                className="DownloadPNGBtn"
                variant="contained"
                color="neutral"
                sx={{
                  width: 100,
                }}
                onClick={() => handleChange("DownloadPNG", 1)}
              >
                PNG
                <MdDownload />
              </Button>
            </ThemeProvider>
          </div>
        </div>
      ) : null}
      <div className="SVG-cover">
        <div className="SVG" style={Colors.ChangeColor}>{SvgGroup}</div>
      </div>
      <div className="Side">
        <SideBar
          LayerGroup={LayerGroup}
          handleChange={handleChange}
          Disabled={FunctionDisabled}
          bgColor={WaveJSON[0].SvgFactor[0].bgColor}
        />
      </div>
      <div className="Bottom">
        {CurrentActiveLayer ? (
          BottomBarGroup[Number(CurrentActiveLayer) - 1]
        ) : (
          <div className="Bottom-Bar">
            <h1 className="Filling-Text">Please select a layer</h1>
          </div>
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
