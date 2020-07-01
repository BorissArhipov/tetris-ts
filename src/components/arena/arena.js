"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Arena {
    constructor() {
        this.matrix = this.createMatrix(15, 25);
    }
    createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }
}
exports.Arena = Arena;
