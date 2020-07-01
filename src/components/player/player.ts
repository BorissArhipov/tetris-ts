//Player class
export class Player {
    public matrix: number[][];
    public pos: {x: number, y: number};
    public score: number;

    public constructor() {
        this.matrix = [[0]];
        this.pos = {x: 0, y: 0};
        this.score = 0;
    }
}
