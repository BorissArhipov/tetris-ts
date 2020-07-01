import './app.css';
import tetrisPieces from './../tetrisPieces/tetrisPieces';
import { Player } from './../player/player';
import { Arena } from './../arena/arena';

// Tetris class
class Tetris {
    private tetrisCanvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private startButton: HTMLButtonElement;
    private gameOver: HTMLParagraphElement;
    private overScore: HTMLParagraphElement;
    private lastTime: number;
    private dropCounter: number;
    private dropInterval: number;

    constructor() {
        this.tetrisCanvas = document.getElementById('tetris') as HTMLCanvasElement;
        this.context = this.tetrisCanvas.getContext('2d') as CanvasRenderingContext2D;
        this.startButton = document.getElementById('start') as HTMLButtonElement;
        this.gameOver = document.getElementById('game-over') as HTMLParagraphElement;
        this.overScore = document.getElementById('over-score') as HTMLParagraphElement;

        this.context.scale(20, 20);

        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;

        this.update();
        this.keyControls();
        this.updateScore();
        this.startGame();
    }

    startGame() {
        this.startButton.addEventListener('click', () => {
            this.playerReset();
            this.startButton.disabled = true;
            this.gameOver.style.display = "none";
            this.overScore.style.display = "none";
        });
    }

    arenaSweep() {
        let rowCounter = 1;
        outer: for(let y = arena.matrix.length - 1; y > 0; --y) {
            for(let x = 0; x < arena.matrix[y].length; ++x) {
                if(arena.matrix[y][x] === 0) {
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
        const score = document.getElementById('score')! as HTMLDivElement;
        score.innerText = `Your score: ${player.score.toString()}`;
    }

    collide(arena: Arena, player: Player) {
        const [m, o] = [player.matrix, player.pos];
        for (let y = 0; y < m.length; ++y) {
            for(let x = 0; x < m[y].length; ++x) {
                if(m[y][x] !== 0 &&
                    (arena.matrix[y + o.y] && arena.matrix[y + o.y][x + o.x]) !== 0) {
                return true;
                }
            }
        }
        return false;
    }

    merge(arena: Arena, player: Player) {
        player.matrix.forEach((row: number[], y: number) => {
            row.forEach((value: number, x: number) => {
                if(value !== 0) {
                    arena.matrix[y + player.pos.y][x + player.pos.x] = value;
                }
            })
        })
    }

    movePiece(dir: number) {
        player.pos.x += dir;
        if(this.collide(arena, player)) {
            player.pos.x -= dir;
        }
    }

    rotatePiece(dir: number) {
        const pos = player.pos.x;
        let offset = 1;
        this.rotate(player.matrix, dir);
        while(this.collide(arena, player)) {
            player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if(offset > player.matrix[0].length) {
                this.rotate(player.matrix, -dir);
                player.pos.x = pos;
                return;
            }
        }
    }

    rotate(matrix: number[][], dir: number) {
        for(let y = 0; y < matrix.length; ++y) {
            for(let x = 0; x < y; ++x) {
                [
                    matrix[x][y],
                    matrix[y][x]
                ] = [
                    matrix[y][x],
                    matrix[x][y]
                ];
            }
        }
        if(dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }
    
    playerReset() {
        player.matrix = tetrisPieces.getPiece();
        player.pos.y = 0;
        player.pos.x = (arena.matrix[0].length / 2 | 0) - 
                       (player.matrix[0].length / 2 | 0);
        if(this.collide(arena, player)) {
            arena.matrix.forEach(row => row.fill(0));
            this.gameOver.style.display = "block";
            this.overScore.style.display = "block";
            this.overScore.innerText = `Your score: ${player.score.toString()}`;
            player.score = 0;
            this.updateScore();
            player.matrix = [[0]];
            this.startButton.disabled = false;
        }
    }

    keyControls() {
        document.addEventListener('keydown', event => {
            if(event.keyCode === 65) {
                this.movePiece(-1);
            }
            if(event.keyCode === 68) {
                this.movePiece(1);
            }
            if(event.keyCode === 81) {
                this.rotatePiece(-1);
            }
            if(event.keyCode === 69) {
                this.rotatePiece(1);
            }
            if(event.keyCode === 83) {
                player.pos.y++;
                if(this.collide(arena, player)) {
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

    drawMatrix(matrix: number[][], offset: {x: number, y: number}) {
        matrix.forEach((row: number[], y: number) => {
            row.forEach((value: number, x: number) => {
                if(value !== 0) {
                    this.context.fillStyle = tetrisPieces.colors[value];
                    this.context.fillRect(
                        x + offset.x,
                        y + offset.y,
                        1,
                        1
                    );
                }
            })
        })
    }

    draw() {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.tetrisCanvas.width, this.tetrisCanvas.height);
        
        this.drawMatrix(arena.matrix, {x: 0, y: 0});
        this.drawMatrix(player.matrix, player.pos);
    }

    update(time = 0) {
        const deltaTime: number = time - this.lastTime;
        this.lastTime = time;
        
        this.dropCounter += deltaTime;
        if(this.dropCounter > this.dropInterval) {
            player.pos.y++;
            if(this.collide(arena, player)) {
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


const player = new Player;
const arena = new Arena;
new Tetris;