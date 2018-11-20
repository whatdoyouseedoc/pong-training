import IPlayer from '../interfaces/IPlayer';
import Rect from './Rect';

export default class Player extends Rect implements IPlayer {
    public score: number;

    constructor() {
        super(10, 50);
        this.score = 0;
    }
}