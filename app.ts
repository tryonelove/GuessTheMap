class Drawing{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private hold: boolean;

    constructor(){
        let canvas = document.getElementById("drawingArea") as
            HTMLCanvasElement;
        let context = canvas.getContext("2d") as 
            CanvasRenderingContext2D;
        context.lineWidth = 2;
        context.lineCap = "round";
        context.lineJoin = "round";

        this.canvas = canvas;
        this.context = context;
        this.hold = false;

        this.setHandlers();
    }

    private getMousePosition(event: MouseEvent) : any{
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
        let canvas = this.canvas;
        canvas.addEventListener("mousemove", this.mouseMoveHandler);
        canvas.addEventListener("mousedown", this.mouseDownHandler);
        canvas.addEventListener("mouseup", this.mouseUpHandler);
        canvas.addEventListener("mouseout", this.mouseUpHandler); 
    }
}

new Drawing();