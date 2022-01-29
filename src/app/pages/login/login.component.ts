import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(private fb: FormBuilder, public userService: UserService, private snackBar: MatSnackBar, private router:Router) {}

	ngOnInit(): void {}

	loginForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]]
	});

	login() {
		this.userService.getUser(this.loginForm.value.email).then((response:any) => {
			console.log(response);
			if(response.lenght == 0) {
				console.log("Ce compte n\'existe pas");
				this.snackBar.open('Ce compte n\'existe pas','Ok');
			}else {
				if (response[0].password === this.loginForm.value.password) {
					console.log("matched");
					this.snackBar.open('Connexion réussi', 'Ok');
					this.userService.user = response[0];
					localStorage.setItem('user', JSON.stringify(response[0]));
					this.router.navigate(['/posts']);
				} else {
					console.log("Mot de passe incorrect");
					this.snackBar.open('Mot de passe incorrect', 'Ok');
				}
			}
		}).catch((error) => {
			console.log(error);
		});
	}
}
