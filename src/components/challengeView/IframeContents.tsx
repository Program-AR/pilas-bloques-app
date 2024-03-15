export const IframeContents = () => {
  (window as any).webkitAudioContext = window.AudioContext;
  
  return <>
    <canvas id="canvas"></canvas>
    <script src="libs/pilasweb.js?v=0.5.0"></script>
    <script src="libs/pilas-bloques-exercises.js?v=1.4.31"></script>
  </>
}