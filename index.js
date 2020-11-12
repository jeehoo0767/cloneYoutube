const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jihupark:jihupark1234@cloneyoutube.j6ofu.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
    }).then(()=>{
        console.log('mongodb connected');
    }).catch(err=>console.log(`몽고 에러 : ${err}`));


app.get('/', (req, res) => {
    res.send('hello world hi ~~~~');
});

app.listen(port, () => {
    console.log('5000번 포트 성공');
})