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
        this.keyControls();
    }
    collide(arena, player) {
        const [m, o] = [player.matrix, player.pos];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                    (arena.matrix[y + o.y] && arena.matrix[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }
    merge(arena, player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    arena.matrix[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
    }
    movePiece(dir) {
        player.pos.x += dir;
        if (this.collide(arena, player)) {
            player.pos.x -= dir;
        }
    }
    keyControls() {
        document.addEventListener('keydown', event => {
            if (event.keyCode === 65) {
                this.movePiece(-1);
            }
            if (event.keyCode === 68) {
                this.movePiece(1);
            }
            if (event.keyCode === 83) {
                player.pos.y++;
                if (this.collide(arena, player)) {
                    player.pos.y--;
                    this.merge(arena, player);
                    player.pos.y = 0;
                }
                this.dropCounter = 0;
            }
        });
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
        this.drawMatrix(arena.matrix, { x: 0, y: 0 });
        this.drawMatrix(player.matrix, player.pos);
    }
    update(time = 0) {
        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            player.pos.y++;
            if (this.collide(arena, player)) {
                player.pos.y--;
                this.merge(arena, player);
                player.pos.y = 0;
            }
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
class Arena {
    constructor() {
        this.matrix = this.createMatrix(12, 20);
    }
    createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }
}
const tetrisPieces = new TetrisPieces;
const player = new Player;
const arena = new Arena;
new Tetris;
