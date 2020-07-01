//Arena class
export class Arena {
    public matrix: number[][];

    public constructor() {
        this.matrix = this.createMatrix(12, 20);
    }

    createMatrix(w: number, h: number) {
        const matrix: number[][] = [];
        while(h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }
}