import Pong from './classes/Pong';

const canvas = document.getElementById('pong') as HTMLCanvasElement;
const pong = new Pong(canvas);

canvas.addEventListener('mousemove', event => {
    pong.players[0].pos.y = event.offsetY - pong.players[0].size.y / 2;
});

canvas.addEventListener('click', () => pong.start());