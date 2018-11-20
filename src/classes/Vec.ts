import IVec from '../interfaces/IVec';

class Vec implements IVec {
    public x: number;
    public y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get len(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    set len(value: number) {
        const fact = value / this.len;
        this.x *= fact;
        this.x *= fact;
    }
}

export default Vec;