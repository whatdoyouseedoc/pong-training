import Ball from './Ball';
import Player from './Player';

export default class Pong {
    private _canvas: HTMLCanvasElement;
    private _context: any;
    private _accumulator: number;

    public step: number;
    public ball: Ball;
    public players: Player[];

    public CHAR_PIXEL: number;
    public CHARS: HTMLCanvasElement[];

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._context = this._canvas.getContext('2d');
        this._accumulator = 0;

        this.step = 1/120;
        this.ball = new Ball;

        this.players = [
            new Player,
            new Player
        ];

        this.players[0].pos.x = 40;
        this.players[1].pos.x = this._canvas.width - 40;

        this.players.forEach(player => {
            player.pos.y = this._canvas.height / 2 - player.bottom / 2;
        });

        let lastTime: number;
        const callback = (millis: number): void => {
            if (lastTime) {
                this.update((millis - lastTime) / 1000);             
                this.draw();
            }
            
            lastTime = millis;
            requestAnimationFrame(callback);
        };

        this.CHAR_PIXEL = 10;
        this.CHARS = [
            '111101101101111',
            '010010010010010',
            '111001111100111',
            '111001111001111',
            '101101111001001',
            '111100111001111',
            '111100111101111',
            '111001001001001',
            '111101111101111',
            '111101111001111'
        ].map(str => {
            const canvas = document.createElement('canvas');
            canvas.height = this.CHAR_PIXEL * 5;
            canvas.width = this.CHAR_PIXEL * 3;
            const context = canvas.getContext('2d');
            context.fillStyle = '#fff';
            str.split('').forEach((fill, i) => {
                if (fill === '1') {
                    context.fillRect(
                        (i % 3) * this.CHAR_PIXEL,
                        (i / 3 | 0) * this.CHAR_PIXEL,
                        this.CHAR_PIXEL,
                        this.CHAR_PIXEL,
                    );
                }
            });

            return canvas;
        });

        this.reset();
    }

    collide(player: Player, ball: Ball): void {
        if (ball.left < player.right && ball.right > player.left &&
            ball.bottom > player.top && ball.top < player.bottom) {
                const len = ball.vel.len;
                ball.vel.x = -ball.vel.x;
                ball.vel.y = 300 * (Math.random() - .5);
                ball.vel.len *= 1.05;
        }
    }

    reset(): void {
        this.ball.pos.x = this._canvas.width / 2 - this.ball.size.x / 2;
        this.ball.pos.y = this._canvas.height / 2 - this.ball.size.y / 2;
        this.ball.vel.x = 0;
        this.ball.vel.y = 0;
        
    }

    start(): void {
        if (this.ball.vel.x === 0 && this.ball.vel.y === 0) {
            this.ball.vel.x = 300 * (Math.random() > .5 ? 1 : -1);
            this.ball.vel.y = 300 * (Math.random() * 2 - 1);
            this.ball.vel.len = 200;
        }
    }

    draw(): void {
        this._context.fillStyle = '#000';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        this.drawRect(this.ball);
        this.players.forEach(player => this.drawRect(player));

        this.drawScore();
    }

    drawRect(rect: Rect): void {
        this._context.fillStyle = '#fff';
        this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }

    drawScore(): void {
        const align = this._canvas.width / 3;
        const CHAR_W = this.CHAR_PIXEL * 4;
        this.players.forEach((player, index) => {
            const chars = player.score.toString().split('');
            const offset = align * (index + 1) - (CHAR_W * chars.length / 2) + this.CHAR_PIXEL / 2;
            chars.forEach((char, pos) => {
                this._context.drawImage(this.CHARS[parseInt(char)], offset + pos * CHAR_W, 20);
            });
        });
    }

    simulate(dt: number) {
        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt;

        if (this.ball.left < 0 || this.ball.right > this._canvas.width) {
            let playerId = this.ball.left < 0 ? 1 : 0;
            this.players[playerId].score++;
            this.reset();
        }

        if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
            this.ball.vel.y = -this.ball.vel.y;
        }

        this.players[1].pos.y = this.ball.pos.y - this.players[1].size.y / 2;
        this.players.forEach(player => this.collide(player, this.ball));
    }

    update(dt: number) {
        this._accumulator += dt;
        while (this._accumulator > this.step) {
            this.simulate(this.step);
            this._accumulator -= this.step;
        }
    }
}