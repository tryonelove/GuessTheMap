let canvasElement = document.getElementById('drawingArea') as HTMLCanvasElement;
let parentElement = canvasElement.parentElement;
let ctx = canvasElement.getContext("2d");

function initialize() {
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
}


function resizeCanvas() {
    let tempCtx = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
    canvasElement.width = parentElement.offsetWidth - 10;
    ctx.putImageData(tempCtx, 0,0);
}

initialize();
resizeCanvas();