import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

let expireafterdays=30;
tokenSchema.index({"createdAt": 1}, {expireAfterSeconds: expireafterdays*24*60*60});

export default mongoose.model('RevokedTokens', tokenSchema);;