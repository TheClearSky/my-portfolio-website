import mongoose from 'mongoose';

const chessGameSchema = mongoose.Schema(
    {
        fen:String,
        whiteplayer:{ type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        whiteplayersocketID:String,
        blackplayer:{ type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        blackplayersocketID:String
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('ChessGames', chessGameSchema);