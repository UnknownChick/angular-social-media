import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-create-account',
	templateUrl: './create-account.component.html',
	styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

	constructor(private fb: FormBuilder, public userService: UserService, private router: Router) {}

	ngOnInit(): void {}

	createAccountForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		username: ['', [Validators.required, Validators.maxLength(12)]],
		password: ['', [Validators.required, Validators.minLength(6)]]
	});

	create() {
		//   console.log(this.createAccountForm.value);
		this.userService.createNewUser(this.createAccountForm.value).then(
			(response)=>{
				console.log(response);
				this.userService.user = response;
				localStorage.setItem('user', JSON.stringify(response));
				this.router.navigate(['/posts']);
			}).catch((error)=>{
				console.log(error);
			});
	}
}
