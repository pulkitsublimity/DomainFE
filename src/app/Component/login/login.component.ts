import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { AlertService } from 'src/app/Services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  logForm: FormBuilder | any;
  userdata:any;

 constructor(private formBuilder: FormBuilder, private router:Router, private userData: UserService, private alertservice:AlertService) {
  this.logForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });
  if(userData.isLogged)
  {this.router.navigate(['dashboard'])}
 }

 onLog(data: any) {
  this.logForm.submitted = true;
    if (this.logForm.valid) {
      this.userData.login(data).subscribe(
        (response) => {
          if(response.statusCode == 201){
          const { token, id } = response;
          localStorage.setItem('curToken', token);
          localStorage.setItem('curID', id);
          this.router.navigate(['/dashboard']);
          this.alertservice.alert('Logged In Successfully',1000,'success');
        }
         else{
          this.alertservice.alert('Invalid Email or Password',1000,'warning');
         }},
        (error) => {
            this.alertservice.alert('An error occurred during login.',1000,'danger');
            // Perform actions for other types of errors
        }
      );
    }
}

show(item: HTMLInputElement) {
  if(item.type == 'text'){
    item.type = 'password';
    document.getElementById('eye')!.textContent = 'visibility';
  }
  else
    {item.type = 'text';
    document.getElementById('eye')!.textContent = 'visibility_off';
  }
}

}
