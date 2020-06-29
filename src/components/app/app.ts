import './app.css';

// Tetris class
class Tetris {
    tetrisCanvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor() {
        this.tetrisCanvas = document.getElementById('tetris') as HTMLCanvasElement;
        this.context = this.tetrisCanvas.getContext('2d') as CanvasRenderingContext2D;

        this.context.scale(20, 20);

        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.tetrisCanvas.width, this.tetrisCanvas.height);

        tetrisPieces.getPiece().forEach((row: number[], y: number) => {
            row.forEach((value: number, x: number) => {
                if(value !== 0) {
                    this.context.fillStyle = 'red';
                    this.context.fillRect(x, y, 1, 1);
                }
            })
        })
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

const tetrisPieces = new TetrisPieces;
new Tetris;