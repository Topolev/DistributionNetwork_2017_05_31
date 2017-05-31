import {Curve} from './Curve';
import {Point} from '../classes/Point';
import {ConfigCoordinatePanel} from '../classes/ConfigCoordinatePanel';
import * as util from '../classes/UtilCanvas';
import {StringArray} from './BuilderCurves';

export class ExpressionCurve extends Curve {

    variables: Array<StringArray>;
    fn: (x: number) => number;

    constructor() {
        super();
    }

    public draw(ctx: CanvasRenderingContext2D, config: ConfigCoordinatePanel, color: string) {

        const step = 1;

        let xPrevOrigin = 0;
        let yPrevOrigin: number = +this.fn(xPrevOrigin);

        const xEnd: number = (config.width - 2 * config.marginX) / config.scaleMouse;
        for (let i = xPrevOrigin + step; i < xEnd; i += step) {
            util.drawLine(ctx,
                +util.xOriginToFactLog(xPrevOrigin, config), util.yOriginToFactLog(yPrevOrigin, config),
                util.xOriginToFactLog((xPrevOrigin + step), config), util.yOriginToFactLog(+this.fn(xPrevOrigin + step), config), color);

            xPrevOrigin += step;
            yPrevOrigin = +this.fn(xPrevOrigin);
        }
    }

    drawHorizontalLine(ctx: CanvasRenderingContext2D, config: ConfigCoordinatePanel, xOrigin: number) {
        const yOrigin = this.fn(xOrigin);
        this.drawHorizontalLineFromXOriginToEndWorkspace(xOrigin, yOrigin, ctx, config);
    }
}
