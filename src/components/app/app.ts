import './app.css';

// Tetris class
class Tetris {
    tetrisCanvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    lastTime: number;
    dropCounter: number;
    dropInterval: number;

    constructor() {
        this.tetrisCanvas = document.getElementById('tetris') as HTMLCanvasElement;
        this.context = this.tetrisCanvas.getContext('2d') as CanvasRenderingContext2D;

        this.context.scale(20, 20);

        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;

        this.update();
    }

    drawMatrix(matrix: number[][], offset: {x: number, y: number}) {
        matrix.forEach((row: number[], y: number) => {
            row.forEach((value: number, x: number) => {
                if(value !== 0) {
                    this.context.fillStyle = 'red';
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

        this.drawMatrix(player.matrix, player.pos);
    }

    update(time = 0) {
        const deltaTime: number = time - this.lastTime;
        this.lastTime = time;
        
        this.dropCounter += deltaTime;
        if(this.dropCounter > this.dropInterval) {
            player.pos.y++;
            this.dropCounter = 0;
        }

        this.draw();
        window.requestAnimationFrame(this.update.bind(this));
    }
}

//Tetris Pieces class
class TetrisPieces {
    pieceT: number[][];
    constructor() {
        this.pieceT = [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ]
    }

    getPiece() {
        return this.pieceT;
    }
}

//Player class
class Player {
    matrix: number[][];
    pos: {x: number, y: number};

    constructor() {
        this.matrix = tetrisPieces.getPiece();
        this.pos = {x: 5, y: 5};
    }
}

const tetrisPieces = new TetrisPieces;
const player = new Player;
new Tetris;