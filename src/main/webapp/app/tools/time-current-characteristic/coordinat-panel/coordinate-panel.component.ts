import {Component, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ConfigCoordinatePanel} from './classes/ConfigCoordinatePanel';
import * as util from './classes/UtilCanvas';
import {Curve} from './curves/Curve';
import {SectionX} from './classes/SectionX';
import {Characteristic} from './characteristic/Characteristic';

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

            if (changes.characteristics) {
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
        util.clearAllCanvas(this.ctxIntermidiateXAxis, width, height);
        util.clearAllCanvas(this.ctxCurves, width, height);
    }

    private drawAxisXLog() {
        const conf = this.config;
        let valueSegment = 1;
        let degree = conf.xDivisionLog;
        let xFact: number, color: string = conf.colorIntermediateAxis;

        while ((xFact = this.xOriginToFactLog(valueSegment * Math.pow(10, degree))) < conf.width - conf.marginX) {
            this.drawVerticalLine(this.ctxIntermidiateXAxis, xFact, color);
            if (valueSegment === 1) {
                let valueAxis = (degree < 5) && (degree > -5) ? Math.pow(10, degree).toString() : '10e' + degree;
                let widthText = this.ctxIntermidiateXAxis.measureText(valueAxis).width;
                this.ctxIntermidiateXAxis.fillText(valueAxis, xFact - widthText / 2, conf.height - conf.marginY + 30);
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
        this.clearCanvasOutWorkspace(this.ctxCurves);
    }

    private clearCanvasOutWorkspace(ctx: CanvasRenderingContext2D) {
        const conf = this.config;
        util.clearCanvas(ctx, 0, 0, conf.marginX, conf.height);
        util.clearCanvas(ctx, 0, 0, conf.width, conf.marginY);
        util.clearCanvas(ctx, 0, conf.height - conf.marginY, conf.width, conf.height);
        util.clearCanvas(ctx, conf.width - conf.marginX, 0, conf.width, conf.height);
    }

    private drawCharacteristics() {
        const conf = this.config;
        util.clearAllCanvas(this.ctxCurves, conf.width, conf.height);
        for (let characteristic of this.characteristics) {
            if (characteristic.visable) {
                this.drawCurves(characteristic.curves, characteristic.color);
            }
        }
    }

    public mouseOver = (ev: MouseEvent) => {
        ev.stopPropagation();
        ev.preventDefault();

        let currentX = ev.offsetX;
        const conf = this.config;

        if ((currentX > conf.marginX) && (currentX < (conf.width - conf.marginX))) {
            let xOrigin = this.xFactToOrigin(currentX);
            util.clearAllCanvas(this.ctxSlice, conf.width, conf.height);

            /* HORIZONAL LINE*/
            for (let characteristic of this.characteristics) {
                for (let curve of characteristic.curves) {
                    curve.drawHorizontalLine(this.ctxSlice, conf, xOrigin);
                }
            }

            /* VERTICAL LINE*/
            let xFact = this.xOriginToFactLog(xOrigin);
            util.drawLineDash(this.ctxSlice, xFact, conf.marginY, xFact, conf.height - conf.marginY);
            util.renderTextAndFillBackground(this.ctxSlice, xOrigin.toFixed(2).toString(), xFact, 30);
        } else {
            util.clearAllCanvas(this.ctxSlice, conf.width, conf.height);
        }
    }

    public drawSectionsX() {
        const conf = this.config;
        util.clearAllCanvas(this.ctxStaticSlice, conf.width, conf.height);

        for (let sectionX of this.sectionsX) {
            if (sectionX.x !== undefined) {
                // Horizonal line
                for (let characteristic of this.characteristics) {
                    for (let curve of characteristic.curves) {
                        curve.drawHorizontalLine(this.ctxStaticSlice, conf, sectionX.x);
                    }
                }

                // Vertical line
                let xFact = this.xOriginToFactLog(sectionX.x);
                util.drawLineDash(this.ctxStaticSlice, xFact, conf.marginY, xFact, conf.height - conf.marginY);
                util.renderTextAndFillBackground(this.ctxStaticSlice, (+sectionX.x).toFixed(2).toString(), xFact, 30);
            }
        }
    }

    private mouseWheel = (e: MouseWheelEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const conf = this.config;
        let delta = e.deltaY || e.detail || e.wheelDelta;
        if (delta < 0 && conf.scaleMouse < conf.maxScale) {
            conf.scaleMouse = +(conf.scaleMouse + 0.1).toFixed(1);
        }
        if (delta > 0 && conf.scaleMouse > conf.minScale) {
            conf.scaleMouse = +(conf.scaleMouse - 0.1).toFixed(1);
        }

        this.render();
    }

    private xOriginToFactLog(xOrigin: number): number {
        const conf = this.config;
        return conf.marginX + (Math.log10(xOrigin) - conf.xDivisionLog) * conf.xInitPxPerDivision * conf.scaleMouse;
    }

    private yOriginToFactLog(yOrigin: number): number {
        const conf = this.config;
        return conf.height - conf.marginY - (Math.log10(yOrigin) - conf.yDivisionLog) * conf.yInitPxPerDivision * conf.scaleMouse;
    }

    private xFactToOrigin(xFact: number): number {
        const conf = this.config;
        return Math.pow(10, (xFact - conf.marginX) / (conf.xInitPxPerDivision * conf.scaleMouse) + conf.xDivisionLog);
    }

    private drawVerticalLine(ctx: CanvasRenderingContext2D, x: number, color = '#000000') {
        util.drawLine(ctx, x, this.config.marginY, x, this.config.height - this.config.marginY, color);
    }

    private drawHorizontalLine(ctx: CanvasRenderingContext2D, y: number, color = '#000000') {
        util.drawLine(ctx, this.config.marginX, y, this.config.width - this.config.marginX, y, color);
    }

}
