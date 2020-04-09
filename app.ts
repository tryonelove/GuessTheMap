function initialize() {
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
}

function resizeCanvas() {
    let parentElement = canvas.parentElement;
    let tempCtx = context.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = parentElement.offsetWidth-15; //  padding offset
    context.putImageData(tempCtx, 0,0);
}

class Canvas{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private hold: boolean;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D){
        this.canvas = canvas;
        this.context = context;
        this.hold = false;
        this.setHandlers();
        this.setLineSettings();
    }

    private setLineSettings(): void{
        this.context.lineWidth = 5;

        this.context.lineCap = "round";
        this.context.lineJoin = "round";
    }

    private getMousePosition(event: MouseEvent) : {x:number, y:number}{
        let rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    private draw(x: number, y: number, event: MouseEvent): void{
        if(!this.hold) return;
        this.context.lineTo(x, y);
        this.context.stroke()
    }

    private mouseMoveHandler = (event: MouseEvent) => {
        let pos = this.getMousePosition(event);
        this.draw(pos.x, pos.y, event);
    }

    private mouseDownHandler = (event: MouseEvent) => {
        this.hold = true;
        let pos = this.getMousePosition(event);
        this.draw(pos.x, pos.y, event);
    }

    private mouseUpHandler = (event: MouseEvent) => {
        this.hold = false;
        this.context.beginPath();
    }

    private setHandlers(){
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
        this.canvas.addEventListener("mouseout", this.mouseUpHandler);

    }

    public setColor(color){
        this.context.strokeStyle = color;
    }

    private clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public getCtx(){
        return this.context;
    }

    public getCanvas(){
        return this.canvas;
    }
}

let canvas = document.getElementById("drawing-canvas") as
HTMLCanvasElement;
let context = canvas.getContext("2d") as 
CanvasRenderingContext2D;

initialize();
resizeCanvas();

let can = new Canvas(canvas, context);


let colorToolbox = document.getElementsByClassName("color") as HTMLCollection;

let arr = Array.from(colorToolbox);
arr.forEach(function(colorElement){
    let color = colorElement.classList[1];
    let el = document.getElementsByClassName(color)[0];
    let style = window.getComputedStyle(el);
    let c = style.getPropertyValue("background-color"); 
    colorElement.addEventListener("click", function(){
        can.setColor(c);
    });
})