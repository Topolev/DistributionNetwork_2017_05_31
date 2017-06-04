import {ConfigCoordinatePanel} from '../classes/ConfigCoordinatePanel';
import * as util from '../classes/UtilCanvas';
import {CurveTemplate} from './CurveTemplate';
import {Characteristic} from '../characteristic/Characteristic';

export class Curve {
    curveTemplate: CurveTemplate;

    public draw(ctx: CanvasRenderingContext2D, characteristic: Characteristic, config: ConfigCoordinatePanel) {
        console.log('This method will have to be overrided in class inheritor');
    }

    public drawHorizontalLine(ctx: CanvasRenderingContext2D, characteristic: Characteristic, config: ConfigCoordinatePanel, xOrigin: number) {
        console.log('This method will have to be overrided in class inheritor');
    }

    /*Draw line which is coming via point (xOrigin, yOrigin)*/
    drawHorizontalLineFromXOriginToEndWorkspace(xOrigin: number, yOrigin: number, ctx: CanvasRenderingContext2D, config: ConfigCoordinatePanel) {
        const yFact = util.yOriginToFactLog(yOrigin, config);
        const xFact = util.xOriginToFactLog(xOrigin, config);
        console.log('origin:', xOrigin, yOrigin);
        console.log('fact:', xFact, yFact);
        if (this.isYFactOnWorkspace(yFact, config)) {
            util.drawLineDash(ctx, xFact, yFact, config.width - config.marginX, yFact);
            util.renderTextAndFillBackground(ctx, (yOrigin.toFixed(2)).toString(), config.width - config.marginX + 5, yFact);
        }
    }

    isYFactOnWorkspace(yFact: number, config: ConfigCoordinatePanel): boolean {
        return (yFact < (config.height - config.marginY)) && (yFact > config.marginY);
    }
}
