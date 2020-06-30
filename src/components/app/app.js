"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./app.css");
class Tetris {
    constructor() {
        this.tetrisCanvas = document.getElementById('tetris');
        this.context = this.tetrisCanvas.getContext('2d');
        this.context.scale(20, 20);
        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;
        this.update();
    }
    drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.context.fillStyle = 'red';
                    this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }
    draw() {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.tetrisCanvas.width, this.tetrisCanvas.height);
        this.drawMatrix(player.matrix, player.pos);
    }
    update(time = 0) {
        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            player.pos.y++;
            this.dropCounter = 0;
        }
        this.draw();
        window.requestAnimationFrame(this.update.bind(this));
    }
}
class TetrisPieces {
    constructor() {
        this.pieceT = [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
    }
    getPiece() {
        return this.pieceT;
    }
}
class Player {
    constructor() {
        this.matrix = tetrisPieces.getPiece();
        this.pos = { x: 5, y: 5 };
    }
}
const tetrisPieces = new TetrisPieces;
const player = new Player;
new Tetris;
