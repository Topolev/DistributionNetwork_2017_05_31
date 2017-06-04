export class SectionX {
    label = '';
    x: number;

    constructor(x?: number, label?: string) {
        this.x = x;
        if (label) {
            this.label = label;
        }
    }
}
