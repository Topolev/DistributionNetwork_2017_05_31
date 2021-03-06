
import {Curve} from './Curve';
import {ConfigCoordinatePanel} from '../classes/ConfigCoordinatePanel';
import {StringArray} from './BuilderCurves';
import * as util from '../classes/UtilCanvas';

export class IndependentCurve extends Curve {

    variables: Array<StringArray>;
    fn: (x: number) => number;

    constructor() {
        super();
    }

    draw(ctx: CanvasRenderingContext2D, config: ConfigCoordinatePanel, color: string) {

        const tsz = +this.variables['tsz'];
        const Isz = +this.variables['Isz'];

        const yTop = (config.height - 2 * config.marginY) / config.scaleMouse ;
        const xRight = (config.width - 2 * config.marginX) / config.scaleMouse;

        util.drawLine(ctx,
            +util.xOriginToFactLog(Isz, config), util.yOriginToFactLog(yTop, config),
            +util.xOriginToFactLog(Isz, config), util.yOriginToFactLog(tsz, config), color);

        util.drawLine(ctx,
            +util.xOriginToFactLog(Isz, config), +util.yOriginToFactLog(tsz, config),
            +util.xOriginToFactLog(xRight, config), +util.yOriginToFactLog(tsz, config), color);
    }

    drawHorizontalLine(ctx: CanvasRenderingContext2D, config: ConfigCoordinatePanel, xOrigin: number) {
        const yOrigin = +this.fn(xOrigin);
        if (xOrigin  > +this.variables['Isz']) {
            this.drawHorizontalLineFromXOriginToEndWorkspace(xOrigin, yOrigin, ctx, config);
        }
    }
}
