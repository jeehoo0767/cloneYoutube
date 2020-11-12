const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require('./models/User');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended : true }));
//application/json
app.use(bodyParser.json());   

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
        useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
    }).then(()=>{
        console.log('mongodb connected');
    }).catch(err=>console.log(`몽고 에러 : ${err}`));


app.get('/', (req, res) => {
    res.send('hello world hi ~~~~');
});

app.post('/register', (req, res) => {
    // 회원 가입 정보를 client에서 요청 받으면 
    // 그 정보들을 데이터 베이스에 insert
    const user = new User(req.body); // user 인스턴스 생성

    user.save((err, userInfo) => {
        if(err) return res.json({ success : false, err });
        else return res.status(200).json({success : true});
    });
});

app.listen(port, () => {
    console.log('5000번 포트 성공');
})