"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tetrisPieces_1 = __importDefault(require("./../tetrisPieces/tetrisPieces"));
class Player {
    constructor() {
        this.matrix = tetrisPieces_1.default.getPiece();
        this.pos = { x: 5, y: 0 };
        this.score = 0;
    }
}
exports.Player = Player;
