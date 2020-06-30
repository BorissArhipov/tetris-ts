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
        this.updateScore();
    }
    arenaSweep() {
        let rowCounter = 1;
        outer: for (let y = arena.matrix.length - 1; y > 0; --y) {
            for (let x = 0; x < arena.matrix[y].length; ++x) {
                if (arena.matrix[y][x] === 0) {
                    continue outer;
                }
            }
            const row = arena.matrix.splice(y, 1)[0].fill(0);
            arena.matrix.unshift(row);
            ++y;
            player.score += rowCounter * 10;
            rowCounter *= 2;
        }
    }
    updateScore() {
        const score = document.getElementById('score');
        score.innerText = player.score.toString();
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
    rotatePiece(dir) {
        const pos = player.pos.x;
        let offset = 1;
        this.rotate(player.matrix, dir);
        while (this.collide(arena, player)) {
            player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > player.matrix[0].length) {
                this.rotate(player.matrix, -dir);
                player.pos.x = pos;
                return;
            }
        }
    }
    rotate(matrix, dir) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    matrix[x][y],
                    matrix[y][x]
                ] = [
                    matrix[y][x],
                    matrix[x][y]
                ];
            }
        }
        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        }
        else {
            matrix.reverse();
        }
    }
    playerReset() {
        player.matrix = tetrisPieces.getPiece();
        player.pos.y = 0;
        player.pos.x = (arena.matrix[0].length / 2 | 0) -
            (player.matrix[0].length / 2 | 0);
        if (this.collide(arena, player)) {
            arena.matrix.forEach(row => row.fill(0));
            player.score = 0;
            this.updateScore();
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
            if (event.keyCode === 81) {
                this.rotatePiece(-1);
            }
            if (event.keyCode === 69) {
                this.rotatePiece(1);
            }
            if (event.keyCode === 83) {
                player.pos.y++;
                if (this.collide(arena, player)) {
                    player.pos.y--;
                    this.merge(arena, player);
                    this.playerReset();
                    this.arenaSweep();
                    this.updateScore();
                }
                this.dropCounter = 0;
            }
        });
    }
    drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.context.fillStyle = tetrisPieces.colors[value];
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
                this.playerReset();
                this.arenaSweep();
                this.updateScore();
            }
            this.dropCounter = 0;
        }
        this.draw();
        window.requestAnimationFrame(this.update.bind(this));
    }
}
class TetrisPieces {
    constructor() {
        this.colors = [
            '',
            '#9a00cd',
            '#cdcd00',
            '#cd0000',
            '#00cd00',
            '#00cdcd',
            '#0000cd',
            '#cd6600'
        ];
        this.pieces = [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ],
            [
                [2, 2],
                [2, 2]
            ],
            [
                [0, 3, 3],
                [3, 3, 0],
                [0, 0, 0]
            ],
            [
                [4, 4, 0],
                [0, 4, 4],
                [0, 0, 0]
            ],
            [
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0]
            ],
            [
                [0, 6, 0],
                [0, 6, 0],
                [0, 6, 6]
            ],
            [
                [0, 7, 0],
                [0, 7, 0],
                [7, 7, 0]
            ]
        ];
    }
    getPiece() {
        return this.pieces[this.pieces.length * Math.random() | 0];
    }
}
class Player {
    constructor() {
        this.matrix = tetrisPieces.getPiece();
        this.pos = { x: 5, y: 0 };
        this.score = 0;
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
