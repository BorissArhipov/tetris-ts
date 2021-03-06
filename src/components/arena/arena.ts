//Arena class
export class Arena {
    public matrix: number[][];

    public constructor() {
        this.matrix = this.createMatrix(15, 25);
    }

    createMatrix(w: number, h: number) {
        const matrix: number[][] = [];
        while(h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }
}