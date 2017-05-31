import {Curve} from './Curve';
import {Point} from '../classes/Point';
import {ConfigCoordinatePanel} from '../classes/ConfigCoordinatePanel';
import * as util from '../classes/UtilCanvas';

export class PointsAbsCurve extends Curve {
    points: Array<Point> = [];

    constructor() {
        super();
    }

    public draw(ctx: CanvasRenderingContext2D, config: ConfigCoordinatePanel, color: string) {

        let pointPrev = this.points[0];
        for (let i = 1; i < this.points.length; i++) {
            util.drawLine(ctx,
                util.xOriginToFactLog(+pointPrev.x, config), util.yOriginToFactLog(+pointPrev.y, config),
                util.xOriginToFactLog(+this.points[i].x, config), util.yOriginToFactLog(+this.points[i].y, config), color);
            pointPrev = this.points[i];
        }
    }

    public drawHorizontalLine(ctx: CanvasRenderingContext2D, config: ConfigCoordinatePanel, xOrigin: number) {
        console.log('drawHorizontalLine');
        if ((+this.points[0].x < xOrigin ) && (+this.points[this.points.length - 1].x > xOrigin )) {
            let prevPoint = this.points[0];
            let i = 0;
            while (prevPoint.x < xOrigin && i < this.points.length) {
                prevPoint = this.points[++i];
            }

            let point1Fact = new Point(util.xOriginToFactLog(this.points[i - 1].x, config), util.yOriginToFactLog(this.points[i - 1].y, config));
            let point2Fact = new Point(util.xOriginToFactLog(prevPoint.x, config), util.yOriginToFactLog(prevPoint.y, config));

            let fn = this.approximationByLine(point1Fact, point2Fact);
            let xFact = util.xOriginToFactLog(xOrigin, config);
            let yFact = fn(xFact);
            this.drawHorizontalLineFromXOriginToEndWorkspace(xOrigin, util.yFactToOriginLog(yFact, config), ctx, config);
        }
    }

    private approximationByLine(point1: Point, point2: Point): (x: number) => number {
        const x1 = +point1.x, y1 = +point1.y;
        const x2 = +point2.x, y2 = +point2.y;
        const k = (y2 - y1) / (x2 - x1);
        const b = (y1 * x2 - x1 * y2) / (x2 - x1);
        return (x) => k * x + b;
    }
}
