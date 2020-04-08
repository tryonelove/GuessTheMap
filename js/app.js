let canvas, context;
let hold;

function init(){
    canvas = document.getElementById("drawingArea");
    context = canvas.getContext("2d");

    function drawPen(canvas, pos) {
        if(!hold) return;
        context.lineWidth = 1;
        context.lineJoin = "round";
        context.lineTo(pos.x, pos.y);
        context.stroke()
    }

    function getMousePosition(canvas, event){
        let rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    canvas.addEventListener("mousemove", function (e) {
        if(hold){
            drawPen(canvas, getMousePosition(canvas, e))
        }
    });
    
    canvas.addEventListener("mousedown", function (e) {
        hold = true;
        drawPen(canvas, getMousePosition(canvas, e))
    });
    canvas.addEventListener("mouseup", function (e) {
        hold = false;
        context.beginPath();
    });
    canvas.addEventListener("mouseout", function (e) {
        let pos = getMousePosition(canvas, e);
    });
}

window.addEventListener("load", init);