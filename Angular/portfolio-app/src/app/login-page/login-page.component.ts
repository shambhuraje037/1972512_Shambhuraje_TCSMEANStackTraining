import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  msg:string = '';
  username:string = '';
  password:any = '';
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  retrieveFromSession(){
    let stringified:any = sessionStorage.getItem("userInfo");
   
    let info = JSON.parse(stringified);
    
    this.username = info[0].username;
    this.password = info[0].pwd;
  }

  checkUser(userRef:any) {
    if(userRef.user === "" && userRef.pwd === ""){
      this.msg="Please SignUp First!";
    }
    else{
    this.retrieveFromSession();
    let user1 = userRef.user;
    let pwd1 = userRef.pwd;
    if(user1==this.username && pwd1==this.password){
      alert("Login Succesfull!")
      this.router.navigate(["portfolio-page"]);  //go to portfolio page
     
    }else{
      this.msg = "Incorrect Username or Password! Please try again!";
    }
  }
}
}
