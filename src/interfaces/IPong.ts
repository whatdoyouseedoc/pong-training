import Ball from '../classes/Ball';
import Player from '../classes/Player';

export default interface Pong {
    _canvas: HTMLCanvasElement;
    _contex: any;
    _accumulator: number;
    
    step: number;
    ball: Ball;
    players: Player[];

    CHAR_PIXEL: number;
    CHARS: HTMLCanvasElement[];
}