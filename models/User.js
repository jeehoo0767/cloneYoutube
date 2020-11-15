const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true,
        unique : 1
    },
    password : {
        type : String,
        minlength : 5
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : { //토큰 유효기간
        type : Number
    }
});

userSchema.pre('save', function(next){
    let user = this;
    // 비밀번호 암호화
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash( user.password, salt , function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    }else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // 입력된 비밀번호와 데이터베이스의 암호화된 비밀번호를 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err),
        cb(null, isMatch)
    })
};
userSchema.methods.generateToken = function(cb) {
    //jsonwebtoken 을 이용해서 토큰 생성
    let user = this;
    let token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save((err, user) => {
        if(err) return cb(err);
        cb(null, user);
    })
};


const User = mongoose.model('User', userSchema);

module.exports = { User };