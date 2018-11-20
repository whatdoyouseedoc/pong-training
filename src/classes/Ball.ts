import Rect from './Rect';
import Vec from './Vec';
import IBall from '../interfaces/IBall';

export default class Ball extends Rect {
    public vel: Vec;

    constructor() {
        super(10, 10);
        this.vel = new Vec;
    }
}