import {Curve} from './Curve';
import {PointsAbsCurve} from './PointsAbsCurve';
import {Point} from '../classes/Point';
import {ExpressionCurve} from './ExpressionCurve';
import {PointsRelativeCurve} from './PointsRelativeCurve';
import {CurveTemplate, TYPE_CURVE} from './CurveTemplate';
import {IndependentCurve} from './IndependentCurve';

export interface StringArray {
    [index: number]: string;
}

export class BuilderCurves {

    public  buildCurve(type: string): Curve {
        let curve: Curve;

        switch (type) {
            case 'POINTSABS': {
                curve = new PointsAbsCurve();
                const points = (<PointsAbsCurve> curve).points = [];
                points.push(new Point(0.1, 0.01));
                points.push(new Point(1, 1));
                break;
            }
            case 'POINTSRELATIVE': {
                curve = new PointsRelativeCurve();
                (<PointsRelativeCurve> curve).baseValue = 10;
                const points = (<PointsRelativeCurve> curve).points = [];
                points.push(new Point(1, 1));
                points.push(new Point(10, 10));
                break;
            }
            case 'EXPRESSION': {
                curve = new ExpressionCurve();
                (<ExpressionCurve> curve).fn = (x) => -0.009 * x + 0.09;
            }
        }

        return curve;

    }

    public  buildCurveByTemplate(curveTemplate: CurveTemplate): Curve {
        let curve: Curve;
        switch (curveTemplate.type) {
            case TYPE_CURVE.POINTS_ABS : {
                curve = new PointsAbsCurve();
                (<PointsAbsCurve> curve).points = [];
                break;
            }
            case TYPE_CURVE.POINTS_RELATIVE : {
                // Change
                curve = new PointsRelativeCurve();
                (<PointsRelativeCurve> curve).points = [];
                (<PointsRelativeCurve> curve).baseValue = 1;
                break;
            }
            case TYPE_CURVE.EXPRESSION: {
                curve = new ExpressionCurve();
                (<ExpressionCurve> curve).fn = curveTemplate.fn;
                const variables: Array<StringArray> = [];
                if (curveTemplate.variableDescriptions) {
                    for (const variable of curveTemplate.variableDescriptions) {
                        variables[variable.label] = 1;
                    }
                }
                (<ExpressionCurve> curve).variables = variables;
                break;
            }
            case TYPE_CURVE.INDEPENDENT: {
                curve = new IndependentCurve();
                (<IndependentCurve> curve).fn = curveTemplate.fn;
                const variables: Array<StringArray> = [];
                if (curveTemplate.variableDescriptions) {
                    for (const variable of curveTemplate.variableDescriptions) {
                        variables[variable.label] = 3.9;
                    }
                }
                (<IndependentCurve> curve).variables = variables;
                break;

            }
        }

        curve.curveTemplate = curveTemplate;
        return curve;
    }
}
