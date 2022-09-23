const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var cors = require('cors');
app.use(cors());

let db;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb+srv://gunhee94:PLhDAwXia2G7pzpC@cluster0.tzu3kwr.mongodb.net/?retryWrites=true&w=majority", (error,client) => {
    if (error) return console.log(error);

    app.listen(8080, () => {
        db = client.db('todoList');    
        console.log('listening on 8080')
    });
});

//login

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : 'secretcode', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

app.post('/login', passport.authenticate('local', {failureRedirect : '/fail'}), (req, res) => {
    res.redirect('/') 
}); 

app.get('/login1', isLogin, (req, res) => {
    res.json({user : req.user.id});
}) 
  
function isLogin(req, res, next) { 
    if (req.user) { 
        next() 
    } else { 
        res.redirect('/login') 
    } 
} 

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
  }, (id, pw, done) => {
    db.collection('login').findOne({ id: id }, (error, result) => {
      if (error) return done(error)
  
      if (!result) return done(null, false, { message: '존재하지않는 아이디 입니다.' })
      if (pw == result.pw) {
        return done(null, result)
      } else {
        return done(null, false, { message: '비번이 틀렸습니다.' })
      }
    })
  }));

passport.serializeUser((user, done) => {
    done(null, user.id)
});
  
passport.deserializeUser((id, done) => {
    db.collection('login').findOne({ id: id }, (error, result) => {
        done(null, result)
    })
}); 


// todoList 전체 목록 조회 
app.get('/list', (req, res) => {

    db.collection("todoList").find({userId : req.user.id}).toArray((error, result) => {
        if(error) {return console.log(error)}
        res.json({todoList : result})
    });
    

})

// todoList 체크 개수 조회
app.get('/count', (req, res) => {

    db.collection("todoList").find({userId : req.user.id, cptYn : true}).count((error, result) => {
        if(error) {return console.log(error)}
        res.json({count : result})
    });
})


// todoList 목록 추가
app.post('/add', (req, res) => {
    
    db.collection("count").findOne({name : "게시물갯수"}, (error, result) => {

        req.body.todoList._id = result.totalPost + 1;
        req.body.todoList.userId = req.user.id;

        db.collection("todoList").insertOne(req.body.todoList, (error, result) => {

            // $set : 바꿀값
            // $inc : 기존값에 더해줄 값 
            // $min : 기존값보다 적을 때만 변경
            // $ rename : key값 이름변경
            db.collection("count").updateOne({name : "게시물갯수"}, { $inc : {totalPost : 1}}, (error, result) => {
                if(error) {return console.log(error)}
                res.send("success");
            }) 
        })

    }) 

})

// // 해당 id todoList 항목 변경
app.put('/update/:id', (req, res) => {

        db.collection("todoList").updateOne({_id : Number(req.params.id)}, {$set : {
            content : req.body.todoList.content,
            cptYn : req.body.todoList.cptYn,
            flagYn : req.body.todoList.flagYn,
            alarmTime : req.body.todoList.alarmTime,
            alarmCheck : req.body.todoList.alarmCheck
        }}, (error, result) => {
            if(error) {return console.log(error)}
            res.send("success");
        })

})

// 해당 id todoList 항목 삭제
app.delete('/delete/:id', (req, res) => {

    db.collection("todoList").deleteOne({_id : Number(req.params.id)}, (error, result) => {
        if(error) {return console.log(error)}
        res.send("success");
    });
})

// 체크된 todoList 항목 삭제
app.delete('/delete', (req, res) => {

    db.collection("todoList").deleteMany({userId : req.user.id, cptYn : true}, (error, result) => {
        if(error) {return console.log(error)}
        res.send("success");
    });
})



app.use(express.static(path.join(__dirname, 'client/build'))); //특정폴더의 파일들 전송가능

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

//리액트 라우터 쓰는경우 최하단에 추가해놓기
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
})