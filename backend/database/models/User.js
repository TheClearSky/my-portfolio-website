import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const emailRegExp = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

export const isEmail = {
    validator: function (email) { 
        if(this.guest)
        {
            //skip validation
            return true;
        }
        return emailRegExp.test(email)
    },
    message: 'Email is Invalid',
}

export const emailIsUnique = {
    validator: async function (email) {
        if(this.guest)
        {
            //skip validation
            return true;
        }
        const userscollection = this.constructor;
        const currentid = this._id;
        const founduser = await userscollection.exists({email}).exec();

        return founduser === null || currentid.equals(founduser._id);
    },
    message: 'Email is already in Use',
};

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength:5,
            maxLength:20
        },
        email: {
            type: String,
            required: true,
            lowercase:true,
            trim:true,
            maxLength:100,
            validate: [isEmail,emailIsUnique]
        },
        password: {
            type: String,
            required: true,
            trim:true,
            minLength:8,
            maxLength:100
        },
        guest:{
            type:Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('Users', userSchema);

export default User;