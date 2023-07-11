import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { FormGroup,FormControl,FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { CustomValidatorService } from 'src/app/Services/custom-validator.service';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  closeResult: any = '';
  ChangePassForm: FormBuilder | any;
  formGroup:FormGroup;
  User:any;
  Email:any;
  Number:any;
  constructor(private router:Router, public userService:UserService, private modalService: NgbModal, private formBuilder: FormBuilder, private customValidatorService: CustomValidatorService,private alertservice:AlertService){
    this.ChangePassForm = this.formBuilder.group
    ({
      password: [null, [Validators.required, Validators.minLength(8)]],
      conPassword: [null, [Validators.required, Validators.minLength(8)]],
    },
    {
      validators: [
        this.customValidatorService.comparePassword(
          'conPassword',
          'password'
        ),
      ],
    });

  }

  FetchUser(): void {
      this.userService.User(localStorage.getItem('curID')).subscribe(
        (res:any)=>{
        this.User = res.posts[0].name;
        this.Email = res.posts[0].email;
        this.Number = res.posts[0].number;
      },
      (error)=>{
        console.log(error);
      })
  }
  open2(content2: any) 
  {
    this.modalService
      .open(content2, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => 
        {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => 
        {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string 
  {
    if (reason === ModalDismissReasons.ESC) 
    {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) 
    {
      return 'by clicking on a backdrop';
    } else 
    {
      return `with: ${reason}`;
    }
  }
  Submit(data:any)
  {
    this.ChangePassForm.submitted==true;
    if(this.ChangePassForm.valid){
      this.userService.ChangePass(data).subscribe(
        (res)=>{
          if(res.statusCode==202){this.alertservice.alert("Password Changed Successfully",1500,"success")}
          else{
            this.alertservice.alert("Password Change UnSuccessful",1500,"warning")
          }},
        (error)=>{this.alertservice.alert("Error Changing Password",1500,"danger")}
      );
      this.ChangePassForm.reset();
     }
  }
  logout(){
    this.userService.logout();
    this.alertservice.alert("You are Logged out",1500,"success")
  }
}
