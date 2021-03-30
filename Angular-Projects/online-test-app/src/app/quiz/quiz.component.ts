import { getCurrencySymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Quiz } from '../quiz.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions:Array<Quiz>=[];
  answerKey:Array<QA>=[];
  userAnswers:Array<QA>=[];
  numCorrect:number = 0;
  resultFlag:boolean = false;
  click:boolean = false;
  msg:string="";
  msg1:string="";
  constructor(public quizQA:QuizService) { }

  ngOnInit(): void {
    this.quizQA.loadQuizDetails().subscribe(result=>{this.questions=result
      for (let i=0;i<10;i++){ 
        this.createAnswerKey(result[i].question,result[i].correctAnswer)
        console.log(this.createAnswerKey);
      }});
  }
  onSelect(question:string,answer:number){
    let obj = new QA(question,answer);
    let n:boolean = true;
    
    for (let i=0;i<this.userAnswers.length;i++){
      if(this.userAnswers[i].question == question){
        n = false;
        this.userAnswers[i].answer = answer;
      }
    }
    if(n){this.userAnswers.push(obj);} 
    
  }
  createAnswerKey(question:string, answer:number){
    let obj = new QA(question,answer);
    this.answerKey.push(obj);
  }
  onSubmit(){
    this.compareAnswers();
    this.resultFlag = true;
    this.click = !this.click;
    this.CorrectAnswer();
    this.resultColor();
  }
  compareAnswers(){
    for(let j=0;j<10;j++){
      let question = this.answerKey[j].question;
      for (let i=0;i<10;i++){
        if(this.userAnswers[i].question == question){
          if(this.userAnswers[i].answer == this.answerKey[j].answer){
            this.numCorrect++;
          }
          break; 
        }
      }
    }
  }
  resultColor():string{
    if(this.numCorrect>=7){
      this.msg1="Passed!"
      this.msg= "Way to go! You have passed the test, Congratulations!";
      return "green";
    }
    else{
      this.msg1="You are almost there!"
      this.msg="Please Try again! You need 7 out of 10 to pass.";
      return "red";
  }
}

  CorrectAnswer(){
    for(let i=0;i<10;i++){
      document.getElementById(this.userAnswers[i].question+this.userAnswers[i].answer)!.style.color= "red";
      document.getElementById(this.answerKey[i].question+this.answerKey[i].answer)!.style.color = "darkgreen";
    }
  
  }
}
class QA {
  constructor(public question:string, public answer:number){}
}

