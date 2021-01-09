// 
window.onload = function() {
  let canvas = document.getElementById('minesweeperCanvas'), canvasCtx
  canvasCtx = canvas.getContext('2d');
  // entry point
  initialise(canvasCtx);
}