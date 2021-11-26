const request = require('request');
const cheerio = require('cheerio');
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
var resultDB =[];


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
});

connnection.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
})

app.get("/",(req,res) => {
    res.render("landingPage.ejs");
});

app.get("/webScrape", (req,ress) =>{

    request("https://www.geeksforgeeks.org/html-course-practice-quiz-1/", (err, res, html) => {
    if (!err && res.statusCode == 200) {
        const $ = cheerio.load(html);
        var question = '#mtq_question_text-1-1'; //id    1-1, 2-1, 3-1.........1-1-1, 1-2-1,  2-1-1
        var answer = '#mtq_answer_text-1-1-1'; //id
        var correctAnswer = '#mtq_row-1-1-1'; //id
        //console.log(question.substring(0,19));
        for(var i=1; i<11 ; i++){
            if(i!=7)
            question = $(question.substring(0,19).concat(i.toString(), '-1')).html();
            var answer1 = $(answer.substring(0,17).concat(i.toString(), '-1-1')).html().concat(' ');
            var answer2 = $(answer.substring(0,17).concat(i.toString(), '-2-1')).html().concat(' ');
            var answer3 = $(answer.substring(0,17).concat(i.toString(), '-3-1')).html().concat(' ');
            var answer4 = $(answer.substring(0,17).concat(i.toString(), '-4-1')).html().concat(' ');
            var correct1 = $(correctAnswer.substring(0,9).concat(i.toString(), '-1-1')).html().includes("Correct");
            var correct2 = $(correctAnswer.substring(0,9).concat(i.toString(), '-2-1')).html().includes("Correct");
            var correct3 = $(correctAnswer.substring(0,9).concat(i.toString(), '-3-1')).html().includes("Correct");
            var correct4 = $(correctAnswer.substring(0,9).concat(i.toString(), '-4-1')).html().includes("Correct");
            var finalAnswer;

            if(answer1.includes('&lt;') && answer1.includes('&gt')){
                answer1 = answer1.replaceAll('&lt;', '<');
                answer1 = answer1.replaceAll('&gt;', '>');
            }
            if(answer2.includes('&lt;') && answer2.includes('&gt')){
                answer2 = answer2.replaceAll('&lt;', '<');
                answer2 = answer2.replaceAll('&gt;', '>');
            }
            if(answer3.includes('&lt;') && answer3.includes('&gt')){
                answer3 = answer3.replaceAll('&lt;', '<');
                answer3 = answer3.replaceAll('&gt;', '>');
            }
            if(answer4.includes('&lt;') && answer4.includes('&gt')){
                answer4 = answer4.replaceAll('&lt;', '<');
                answer4 = answer4.replaceAll('&gt;', '>');
            }

            if(correct1==true){
                finalAnswer = answer1;
            }
            else if(correct2==true){
                finalAnswer = answer2;
            }
            else if(correct3==true){
                finalAnswer = answer3;
            }
            else{
                finalAnswer = answer4;
            }
            // console.log(answer1);
            // console.log(answer2);
            // console.log(answer3);
            // console.log(answer4);
            // console.log(finalAnswer);
            const q = `insert into quiz (question,option1,option2,option3,option4,answer) values
                        ('${question}',
                        '${answer1}',
                        '${answer2}',
                        '${answer3}',
                        '${answer4}',
                        '${finalAnswer}')`;
            connnection.query(q, (err, res) => { 
                if (err) { console.log(err) } 
                else { 
                    //console.log("entry added in quiz table");
                 } 
            });
            question = '#mtq_question_text-1-1';
        }
        const q = `select * from quiz`;
connnection.query(q, (err, result) => { 
if (err) { console.log(err) } 
else { 
    console.log("ppp");
    resultDB = result.concat();
    ress.redirect("/data");
    //console.log(res[0].question);
 } 
});
        
    }
    else{
        console.log(res.statusCode);
    }
    });
})

app.get("/data",(req,res) => {
    console.log(resultDB.length);
    res.render("showData.ejs",{result:resultDB});
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});

