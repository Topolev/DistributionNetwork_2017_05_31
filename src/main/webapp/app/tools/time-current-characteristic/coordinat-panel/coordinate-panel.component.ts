import {Component, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ConfigCoordinatePanel} from './classes/ConfigCoordinatePanel';
import * as util from './classes/UtilCanvas';
import {Curve} from './curves/Curve';
import {SectionX} from './classes/SectionX';
import {Characteristic} from "./characteristic/Characteristic";

@Component({
    selector: 'coordinate-panel',
    templateUrl: './coordinate-panel.component.html',
    styleUrls: ['./coordinate-panel.scss']
})
export class CoordinatePanelComponent implements AfterViewInit, OnChanges {

    @ViewChild('workSpace') workSpace: ElementRef;
    @ViewChild('intermidiateXAxis') intermidiateXAxis: ElementRef;
    @ViewChild('intermidiateYAxis') intermidiateYAxis: ElementRef;
    @ViewChild('curves') curvesCanvas: ElementRef;
    @ViewChild('staticSlice') staticSlice: ElementRef;
    @ViewChild('slice') slice: ElementRef;

    @Input('configPanel') config: ConfigCoordinatePanel;
    @Input('characteristics') characteristics: Array<Characteristic>;
    @Input('sectionsX') sectionsX: Array<SectionX>;

    ctxWorkspace: CanvasRenderingContext2D;
    ctxIntermidiateXAxis: CanvasRenderingContext2D;
    ctxIntermidiateYAxis: CanvasRenderingContext2D;
    ctxCurves: CanvasRenderingContext2D;
    ctxStaticSlice: CanvasRenderingContext2D;
    ctxSlice: CanvasRenderingContext2D;

    ngOnChanges(changes: SimpleChanges): void {
        if (this.ctxWorkspace !== undefined) {
            if (changes.sectionsX) {
                this.drawSectionsX();
            }

            if (changes.characteristics){
                console.log("Rerender")
                this.drawCharacteristics();
            }
        }
    }

    constructor() {
    }

    ngAfterViewInit(): void {
        this.ctxWorkspace = this.workSpace.nativeElement.getContext('2d');
        this.ctxIntermidiateXAxis = this.intermidiateXAxis.nativeElement.getContext('2d');
        this.ctxIntermidiateYAxis = this.intermidiateXAxis.nativeElement.getContext('2d');
        this.ctxCurves = this.curvesCanvas.nativeElement.getContext('2d');
        this.ctxStaticSlice = this.staticSlice.nativeElement.getContext('2d');
        this.ctxSlice = this.slice.nativeElement.getContext('2d');


        /* draw workspace*/
        const config = this.config;
        util.drawOutlineRectangle(this.ctxWorkspace, config.marginX, config.marginY,
            config.width - config.marginX, config.height - config.marginY, config.colorMainAxis);

        this.slice.nativeElement.addEventListener('mousemove', this.mouseOver);
        this.slice.nativeElement.addEventListener('wheel', this.mouseWheel);

        this.render();
    }

    private render() {
        this.clearCanvases();

        this.drawAxisXLog();
        this.drawAxisYLog();
        this.drawCharacteristics();
    }

    private clearCanvases() {
        const width = this.config.width;
        const height = this.config.height;
        util.clearCanvas(this.ctxIntermidiateXAxis, width, height);
        util.clearCanvas(this.ctxCurves, width, height);
    }

    private drawAxisXLog() {
        let valueSegment = 1;
        let degree = this.config.xDivisionLog;
        let xFact: number, color: string = this.config.colorIntermediateAxis;

        while ((xFact = this.xOriginToFactLog(valueSegment * Math.pow(10, degree))) < this.config.width - this.config.marginX) {
            this.drawVerticalLine(this.ctxIntermidiateXAxis, xFact, color);
            if (valueSegment === 1) {
                let valueAxis = (degree < 5) && (degree > -5) ? Math.pow(10, degree).toString() : '10e' + degree;
                let widthText = this.ctxIntermidiateXAxis.measureText(valueAxis).width;
                this.ctxIntermidiateXAxis.fillText(valueAxis, xFact - widthText / 2, this.config.height - this.config.marginY + 30);
            }
            valueSegment++;
            if (valueSegment === 10) {
                valueSegment = 1;
                color = this.config.colorMainAxis;
                degree++;
            } else {
                color = this.config.colorIntermediateAxis;
            }
        }
    }

    private drawAxisYLog() {
        let valueSegment = 1;
        let degree = this.config.yDivisionLog;
        let yFact: number, color: string = this.config.colorIntermediateAxis;

        while ((yFact = this.yOriginToFactLog(valueSegment * Math.pow(10, degree))) > this.config.marginY) {
            this.drawHorizontalLine(this.ctxIntermidiateYAxis, yFact, color);
            if (valueSegment === 1) {
                let valueAxis = (degree < 5) && (degree > -5) ? Math.pow(10, degree).toString() : '10e' + degree;
                this.ctxIntermidiateYAxis.fillText(valueAxis, 10, yFact + 6);
            }
            valueSegment++;
            if (valueSegment === 10) {
                valueSegment = 1;
                color = this.config.colorMainAxis;
                degree++;
            } else {
                color = this.config.colorIntermediateAxis;
            }
        }
    }

    private drawCurves(curves: Array<Curve>, color: string) {
        for (let curve of curves) {
            curve.draw(this.ctxCurves, this.config, color);
        }
    }

    private drawCharacteristics(){
        var conf = this.config;
        util.clearCanvas(this.ctxCurves, conf.width, conf.height);
        for (let characteristic of this.characteristics){
            if (characteristic.visable){
                this.drawCurves(characteristic.curves, characteristic.color);
            }
        }
    }

    public mouseOver = (ev: MouseEvent) => {
        ev.stopPropagation();
        ev.preventDefault();

        let currentX = ev.offsetX;
        let conf = this.config;

        if ((currentX > conf.marginX) && (currentX < (conf.width - conf.marginX))) {
            let xOrigin = this.xFactToOrigin(currentX);
            util.clearCanvas(this.ctxSlice, conf.width, conf.height);

            /* HORIZONAL LINE*/
            for (let characteristic of this.characteristics){
                for (let curve of characteristic.curves) {
                    curve.drawHorizontalLine(this.ctxSlice, this.config, xOrigin);
                }
            }

            /* VERTICAL LINE*/
            let xFact = this.xOriginToFactLog(xOrigin);
            this.drawLineDash(this.ctxSlice, xFact, conf.marginY, xFact, conf.height - conf.marginY);
            this.renderTextAndFillBackground(this.ctxSlice, xOrigin.toFixed(2).toString(), xFact, 30);
        } else {
            util.clearCanvas(this.ctxSlice, conf.width, conf.height);
        }

    }


    public drawSectionsX() {
        let conf = this.config;
        util.clearCanvas(this.ctxStaticSlice, conf.width, conf.height);

        for (let sectionX of this.sectionsX) {
            if (sectionX.x !== undefined) {
                // Horizonal line
                for (let characteristic of this.characteristics){
                    for (let curve of characteristic.curves) {
                        curve.drawHorizontalLine(this.ctxStaticSlice, conf, sectionX.x);
                    }
                }

                // Vertical line
                let xFact = this.xOriginToFactLog(sectionX.x);
                this.drawLineDash(this.ctxStaticSlice, xFact, conf.marginY, xFact, conf.height - conf.marginY);
                this.renderTextAndFillBackground(this.ctxStaticSlice, (+sectionX.x).toFixed(2).toString(), xFact, 30);
            }
        }


    }

    private mouseWheel = (e: MouseWheelEvent) => {
        e.stopPropagation();
        e.preventDefault();

        let conf = this.config;
        let delta = e.deltaY || e.detail || e.wheelDelta;
        if (delta < 0 && conf.scaleMouse < conf.maxScale) {
            conf.scaleMouse = +(conf.scaleMouse + 0.1).toFixed(1);
        };
        if (delta > 0 && conf.scaleMouse > conf.minScale) {
            conf.scaleMouse = +(conf.scaleMouse - 0.1).toFixed(1);
        };

        this.render();
    }

    private xOriginToFactLog(xOrigin: number): number {
        let conf = this.config;
        return conf.marginX + (Math.log10(xOrigin) - conf.xDivisionLog) * conf.xInitPxPerDivision * conf.scaleMouse;
    }

    private yOriginToFactLog(yOrigin: number): number {
        let conf = this.config;
        return conf.height - conf.marginY - (Math.log10(yOrigin) - conf.yDivisionLog) * conf.yInitPxPerDivision * conf.scaleMouse;
    }

    private xFactToOrigin(xFact: number): number {
        let conf = this.config;
        return Math.pow(10, (xFact - conf.marginX) / (conf.xInitPxPerDivision * conf.scaleMouse) + conf.xDivisionLog);
    }

    private drawVerticalLine(ctx: CanvasRenderingContext2D, x: number, color = '#000000') {
        util.drawLine(ctx, x, this.config.marginY, x, this.config.height - this.config.marginY, color);
    }

    private drawHorizontalLine(ctx: CanvasRenderingContext2D, y: number, color = '#000000') {
        util.drawLine(ctx, this.config.marginX, y, this.config.width - this.config.marginX, y, color);
    }

    // Exclude
    private drawLineDash(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color = 'red') {
        ctx.setLineDash([5, 3]);
        /* dashes are 5px and spaces are 3px*/
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([1, 0]);
    }

    // Exclude
    private renderTextAndFillBackground(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color = 'yellow') {
        let widthText = ctx.measureText(text).width;

        ctx.fillStyle = 'yellow';
        ctx.fillRect(x - 3, y + 5, widthText + 3, -20);
        ctx.fillStyle = 'blue';
        ctx.fillText(text, x, y);
    }
}
