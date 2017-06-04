import {ConfigCoordinatePanel} from './ConfigCoordinatePanel';
export function clearCanvas(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number): void {
    ctx.clearRect(x0, y0, x1, y1);
};

export function clearAllCanvas(ctx: CanvasRenderingContext2D, width: number, height: number) {
    clearCanvas(ctx, 0, 0, width, height);
}

export function drawFillRectangle(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string): void {
    ctx.beginPath();
    ctx.rect(x1, y1, x2, y2);
    ctx.fillStyle = color;
    ctx.fill();
};

export function drawOutlineRectangle(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string): void {
    ctx.fillStyle = color;
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
};

export function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, colorLine = '#000000') {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = colorLine;
    ctx.stroke();
}

export function drawLineDash(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color = 'red') {
    ctx.setLineDash([5, 3]);
    /*dashes are 5px and spaces are 3px*/
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([1, 0]);
}

export function renderTextAndFillBackground(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color = 'yellow') {
    const widthText = ctx.measureText(text).width;

    ctx.fillStyle = 'yellow';
    ctx.fillRect(x - 3, y + 5, widthText + 3, -20);
    ctx.fillStyle = 'blue';
    ctx.fillText(text, x, y);
}

export function xOriginToFactLog(xOrigin: number, conf: ConfigCoordinatePanel): number {
    return conf.marginX + (Math.log10(xOrigin) - conf.xDivisionLog) * conf.xInitPxPerDivision * conf.scaleMouse;
}

export function yOriginToFactLog(yOrigin: number, conf: ConfigCoordinatePanel): number {
    return conf.height - conf.marginY - (Math.log10(yOrigin) - conf.yDivisionLog) * conf.yInitPxPerDivision * conf.scaleMouse;
}

export function xFactToOrigin(xFact: number, conf: ConfigCoordinatePanel): number {
    return Math.pow(10, (xFact - conf.marginX) / (conf.xInitPxPerDivision * conf.scaleMouse) + conf.xDivisionLog);
}

export function yFactToOriginLog(yFact: number, conf: ConfigCoordinatePanel): number {
    return Math.pow(10, (conf.height - conf.marginY - yFact) / (conf.xInitPxPerDivision * conf.scaleMouse) + conf.yDivisionLog);
}
