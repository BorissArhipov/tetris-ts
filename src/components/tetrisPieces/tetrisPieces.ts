//Tetris Pieces class
class TetrisPieces {
    public pieces: number[][][];
    public colors: string[]
    public constructor() {
        this.colors = [
            '',
            '#9a00cd',
            '#cdcd00',
            '#cd0000',
            '#00cd00',
            '#00cdcd',
            '#0000cd',
            '#cd6600'
        ]
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

const tetrisPieces = new TetrisPieces;

export default tetrisPieces;