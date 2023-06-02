import WaveJSON from "../components/waves.json";
import { Buffer } from "buffer";
// import { GIFEncoder, encode64 } from "react-native-gifencoder";

export default function Download(type, LayerLevels) {
  let WaveJ = WaveJSON[0].SvgWave;
  const Path = document.querySelectorAll(".visualpath");
  const InitialSvg =
    LayerLevels === 0
      ? null
      : `<svg class="visual" viewBox="0 0 ${WaveJ[0].CanvasWidth} ${WaveJ[0].CanvasWidth}" width="${WaveJ[0].CanvasWidth}" height="${WaveJ[0].CanvasWidth}" xmlns="http://www.w3.org/2000/svg"><g transform="translate(${WaveJ[0].TranslateWidth} ${WaveJ[0].TranslateWidth})">`;
  const PathArray = [];
  Path.forEach((e) => {
    PathArray.push(e.outerHTML);
  });
  const EndSvg = "</g></svg>";
  let SumSvg = PathArray.reduce((acc, cur) => acc + cur, InitialSvg);
  SumSvg += EndSvg;
  let base64doc = "";
  base64doc = Buffer.from(SumSvg).toString("base64");
  const img_to_download = document.createElement("img");
  img_to_download.src = "data:image/svg+xml;base64," + base64doc;

  const canvas = document.createElement("canvas");
  const w = parseInt(WaveJ[0].CanvasWidth);
  const h = parseInt(WaveJ[0].CanvasWidth);

  switch (type) {
    case "SVG":
      const a = document.createElement("a");
      const e = new MouseEvent("click");
      a.download = "Wave.svg";
      a.href = "data:image/svg+xml;base64," + base64doc;
      a.dispatchEvent(e);
      break;
    case "PNG":
      img_to_download.onload = function () {
        canvas.setAttribute("width", w);
        canvas.setAttribute("height", h);
        const context = canvas.getContext("2d");
        //context.clearRect(0, 0, w, h);
        context.drawImage(img_to_download, 0, 0, w, h);
        const dataURL = canvas.toDataURL("image/png");
        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(canvas.msToBlob(), "download.png");
          e.preventDefault();
        } else {
          const a = document.createElement("a");
          const my_evt = new MouseEvent("click");
          a.download = "Wave.png";
          a.href = dataURL;
          a.dispatchEvent(my_evt);
        }
      };
      break;
    default:
      break;
    // case "GIF":
    //   canvas.setAttribute("width", w);
    //   canvas.setAttribute("height", h);
    //   const context = canvas.getContext("2d");
    //   context.drawImage(img_to_download, 0, 0, w, h);

    //   var encoder = new GIFEncoder();
    //   encoder.setRepeat(0); // 0  -> loop forever
    //   // 1+ -> loop n times then stop
    //   encoder.setDelay(500); // go to next frame every n milliseconds
    //   encoder.start();
    //   encoder.addFrame(context);
    //   encoder.finish();
    //   var binary_gif = encoder.stream().getData() //notice this is different from the as3gif package!
    //   var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
    //   const an = document.createElement("a");
    //       const my_evt = new MouseEvent("click");
    //       an.download = "Wave.gif";
    //       an.href = data_url;
    //       an.dispatchEvent(my_evt);
    //   break;
  }
}
