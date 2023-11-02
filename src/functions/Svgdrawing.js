import Wave from "../components/Wave";
import Segment from "../components/Segments";
import WaveJSON from "../components/waves.json";

export default function SvgDrawing(OrderNumber, WaveJson) {
  const SvgExist = WaveJson ? true : false;

  const PathColor = {
    pathcolor: {
      r: "241",
      g: "112",
      b: "19",
      a: "1",
    },
    bgcolor: {
      r: "250",
      g: "250",
      b: "200",
      a: "1",
    }
  };
  // esentials of the img
  let SVG_W = SvgExist ? WaveJson.CanvasWidth : 600;
  let SVG_H = SvgExist ? WaveJson.CanvasWidth : 600;
  let SVG_trans_W = SVG_W / 2;
  let SVG_trans_H = SVG_H / 2;
  let Fill = SvgExist ? WaveJson.PathFill : "transparent";
  let StrokeColor = SvgExist ? WaveJson.StrokeColor : PathColor.pathcolor;
  let bgColor = SvgExist ? WaveJson.bgColor : PathColor.bgcolor;

  let StrokeWidth = SvgExist ? WaveJson.StrokeWidth : 20;
  let Complexity = SvgExist ? WaveJson.Complexity : 0.5;
  let CanvasSize = Math.min(SVG_H, SVG_W) / 2 - 60;
  let setradius = SvgExist ? WaveJson.SetRadius : 0.4;
  let Radius = CanvasSize * setradius;
  let TotalSegments = SvgExist ? WaveJson.Segments : 10;
  let Angle = 360 / TotalSegments;
  let RootSvg;
  let Speed = SvgExist ? WaveJson.Speed : 0;
  let Direction = SvgExist ? WaveJson.Direction : "spin";
  let Visibility = SvgExist ? WaveJson.Visibility : "visible";

  // Segments for identifing each connection points
  const Segments = [];
  // waves determines the curve in & out Angles
  const waves = [];

  // calculation for the Segments:
  // the corrd of center point for this img is (0,0)
  // since it will be translated to the center of the canvas later.
  //
  //
  for (let i = 0; i < TotalSegments; i++) {
    let y1 = Math.sin(((90 - i * Angle) * -1 * Math.PI) / 180) * Radius;
    let x1 = Math.sqrt(Math.pow(Radius, 2) - Math.pow(y1, 2));
    if (i > TotalSegments / 2) {
      x1 = x1 * -1;
      Segments.push(<Segment r={Radius} x={x1} y={y1} />);
    } else {
      Segments.push(<Segment r={Radius} x={x1} y={y1} />);
    }
  }
  for (let i = 0; i < TotalSegments; i++) {
    let nextControlPoint = i + 1;
    if (i === TotalSegments - 1) {
      nextControlPoint = 0;
    }

    let initialX = Segments[i].props.x;
    let initialY = Segments[i].props.y;
    let nextX = Segments[nextControlPoint].props.x;
    let nextY = Segments[nextControlPoint].props.y;
    //
    let randomMin =
      ((180 - Angle)) * Complexity * -1 -
      (90 - (180 - Angle) / 2) -
      i * Angle;
    let randomMax =
      ((180 - Angle)) * Complexity - (90 - (180 - Angle) / 2) - i * Angle;
    let innerAngle = get_Random(randomMin, randomMax) * -1;
    let bottomLine = Math.cos((((180 - Angle) / 2) * Math.PI) / 180) * Radius;
    let waveRadius = get_Random(bottomLine / 2, bottomLine);

    let opAngleMin = randomMin - 180;
    let opAngleMax = randomMax - 180;
    let opInnerAngle = get_Random(opAngleMin, opAngleMax) * -1;

    if (i !== 0) {
      innerAngle = waves[i - 1].props.opInnerAngle + 180 * -1;
    }
    if (i === TotalSegments - 1) {
      opInnerAngle = waves[0].props.innerAngle + 180;
    }

    let waveYLength = Math.sin((innerAngle * Math.PI) / 180) * waveRadius;
    let waveXLength = Math.sqrt(
      Math.pow(waveRadius, 2) - Math.pow(waveYLength, 2)
    );
    let waveX =
      innerAngle > 90 && innerAngle < 270
        ? initialX - waveXLength
        : waveXLength + initialX;
    let waveY = waveYLength + initialY;

    let opwaveYLength = Math.sin((opInnerAngle * Math.PI) / 180) * waveRadius;
    let opwaveXLength = Math.sqrt(
      Math.pow(waveRadius, 2) - Math.pow(opwaveYLength, 2)
    );
    let opwaveX =
      opInnerAngle > 450 || opInnerAngle < 270
        ? nextX - opwaveXLength
        : nextX + opwaveXLength;
    let opwaveY = nextY + opwaveYLength;

    function get_Random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    waves.push(
      <Wave
        initialX={initialX}
        initialY={initialY}
        waveX={waveX}
        waveY={waveY}
        opwaveX={opwaveX}
        opwaveY={opwaveY}
        nextX={nextX}
        nextY={nextY}
        innerAngle={innerAngle}
        opInnerAngle={opInnerAngle}
      />
    );

    RootSvg = waves.reduce((acc, inc, index) => {
      if (index === 0) {
        return (
          acc +
          `${inc.props.initialX} ${inc.props.initialY}` +
          " C " +
          `${inc.props.waveX} ${inc.props.waveY} ${inc.props.opwaveX} ${inc.props.opwaveY} ${inc.props.nextX} ${inc.props.nextY}`
        );
      }
      return (
        acc +
        " C " +
        `${inc.props.waveX} ${inc.props.waveY} ${inc.props.opwaveX} ${inc.props.opwaveY} ${inc.props.nextX} ${inc.props.nextY}`
      );
    }, " M ");
  }

  if (SvgExist) {
    WaveJSON[0].SvgWave[OrderNumber - 1] = {
      Order: `${OrderNumber}`,
      CanvasWidth: SVG_W,
      Complexity: Complexity,
      Radius: Radius,
      SetRadius: setradius,
      Segments: TotalSegments,
      Speed: Speed,
      Direction: Direction,
      Visibility: Visibility,

      TranslateWidth: SVG_trans_W,
      TranslateHeight: SVG_trans_H,
      PathD: RootSvg,
      PathFill: Fill,
      StrokeColor: StrokeColor,
      bgColor:bgColor,
      StrokeWidth: StrokeWidth,
    };
  } else {
    WaveJSON[0].SvgWave.push({
      Order: `${OrderNumber}`,
      CanvasWidth: SVG_W,
      Complexity: Complexity,
      Radius: Radius,
      SetRadius: setradius,
      Segments: TotalSegments,
      Speed: Speed,
      Direction: Direction,
      Visibility: Visibility,

      TranslateWidth: SVG_trans_W,
      TranslateHeight: SVG_trans_H,
      PathD: RootSvg,
      PathFill: Fill,
      StrokeColor: StrokeColor,
      bgColor:bgColor,
      StrokeWidth: StrokeWidth,
    });
  }
}
