import Vec from './Vec';
import IRect from '../interfaces/IRect';

export default class Rect implements IRect {
    public pos: Vec;
    public size: Vec;

    constructor(w: number, h: number) {
        this.pos = new Vec;
        this.size = new Vec(w, h);
    }

    get left(): number {
        return this.pos.x;
    }

    get right(): number {
        return this.pos.x + this.size.x;
    }

    get top(): number {
        return this.pos.y;
    }

    get bottom(): number {
        return this.pos.y + this.size.y;
    }
}