import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  createAccountForm = this.fb.group({
    emaill: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.maxLength(12)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}
