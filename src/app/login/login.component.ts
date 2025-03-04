import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('loginData');
    if(isLoggedIn){
      this.router.navigate(['/result']);
    }
  }
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if(this.loginForm.value.username==="user" && this.loginForm.value.password === "password"){

        localStorage.setItem('loginData', JSON.stringify(this.loginForm.value));
        this.router.navigate(['/result']);
      }
      else{
        alert("Invalid User and password");
      }
    }
  }
  
}
