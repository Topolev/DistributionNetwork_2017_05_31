/**
 * Created by Vladimir on 12.04.2017.
 */

import {Curve} from '../curves/Curve';
import {PointsTemplate} from '../classes/PointsTemplate';
export const enum TYPE_PROTECTION {
    FUSE,
    SWITCHER,
    CUSTOM
}

export class Characteristic {
    id: number;
    label: string;
    color: string;
    curves: Curve[];
    visable: boolean;
    // voltage where is placed protection (relay protection, automatic circuit breaker)
    voltageStep: number;
    // characteristic spread, spread is measured in %
    isSpread: boolean;
    spreadPlus: number;
    spreadMinus: number;
    typeProtection: TYPE_PROTECTION;
    pointsTemplate?: PointsTemplate;

    constructor(id?: number) {
        this.id = id === undefined ? null : id;
        this.color = '#000000';
        this.curves = [];
        this.visable = true;
        this.isSpread = false;
        this.typeProtection = null;
        this.pointsTemplate = null;
    }
}
