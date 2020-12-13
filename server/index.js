const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { auth } = require('./middleware/auth');
const config = require('./config/key');

const { video } = require('./routes/video')
const { User } = require('./models/User');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended : true }));
//application/json
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(cors());
app.use('/uploads', express.static('uploads'));  

app.use('/api/video', require('./routes/video'));
app.use('/api/subscribe', require('./routes/subscribe'))
app.use('/api/comment', require('./routes/comment'))
app.use('/api/like', require('./routes/like'))

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
        useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
    }).then(()=>{
        console.log('mongodb connected');
    }).catch(err=>console.log(`몽고 에러 : ${err}`));


app.get('/', (req, res) => {
    res.send('hello world hi ~~~~');
});

app.post('/api/users/register', (req, res) => {
    // 회원 가입 정보를 client에서 요청 받으면 
    // 그 정보들을 데이터 베이스에 insert
    const user = new User(req.body); // user 인스턴스 생성
    user.save((err, userInfo) => {
        if(err) return res.json({ success : false, err });
        return res.status(200).json({success : true});
    });
});

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일 데이터베이스 에서 찾음
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
    //비밀번호 까지 맞다면 토큰 생성!

    User.findOne({email : req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess : false,
                message : " 이메일에 해당하는 유저가 없음."
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch){
                return res.json({ loginSuccess : false, 
                    message : "비밀번호가 틀렸습니다."})
                }
            else{
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                //토큰을 저장한다. 쿠키나, 로컬스토리지에
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess : true, userId : user._id});
            })
            }
        })
    })
})

app.get('/api/users/auth', auth, (req, res) => {
    //여기까지 미들웨어를 통과해 왔다는 얘기는, Authentication 이 True 라는 말.
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })
})

app.get('/api/users/logout', auth, (req,res) => {
    User.findOneAndUpdate({ _id : req.user._id }, 
        {token : ""}, 
        (err, user) => {
            if(err) return res.json({success : false, err});
            return res.status(200).send({
                success : true
            })
        })
});

app.post('/api/video/upload' ,(req, res) => {

})

app.listen(port, () => {
    console.log('5000번 포트 성공');
})