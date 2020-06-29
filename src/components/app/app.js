"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./app.css");
class Tetris {
    constructor() {
        this.tetrisCanvas = document.getElementById('tetris');
        this.context = this.tetrisCanvas.getContext('2d');
        this.context.scale(20, 20);
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.tetrisCanvas.width, this.tetrisCanvas.height);
        tetrisPieces.getPiece().forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.context.fillStyle = 'red';
                    this.context.fillRect(x, y, 1, 1);
                }
            });
        });
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
const tetrisPieces = new TetrisPieces;
new Tetris;
