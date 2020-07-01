import tetrisPieces from './../tetrisPieces/tetrisPieces';

//Player class
export class Player {
    public matrix: number[][];
    public pos: {x: number, y: number};
    public score: number;

    public constructor() {
        this.matrix = tetrisPieces.getPiece();
        this.pos = {x: 5, y: 0};
        this.score = 0;
    }
}
