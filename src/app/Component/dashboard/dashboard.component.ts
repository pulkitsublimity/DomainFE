import { Component, OnInit , OnDestroy, ViewChild } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup,FormControl,FormBuilder, Validators, FormArray } from '@angular/forms';
import { domainModal } from '../../models/domainModal';
import {
  ModalDismissReasons,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/Services/alert.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  panelOpenState = false;
  closeResult: any = '';
  domainForm: FormBuilder | any;
  userForm: FormBuilder | any;
  lists: MatTableDataSource<any>;
  columnToDisplay: string[] = ['userName','password','domain', 'Action'];
  formGroup:FormGroup;
  isLoadingCompleted:boolean=false;
  DataLoadingStatus:String = 'Loading...';
  isError:boolean = false;
  domainID:any;
  users = new FormControl('');
  searchText: string; 
  userlist: any[] = [];
  

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private userData: UserService, private modalService: NgbModal, private formBuilder: FormBuilder, private alertservice:AlertService){
    this.domainForm = this.formBuilder.group({
      userName: [null, [Validators.required , Validators.pattern('^[a-zA-Z0-9]{5,30}$')]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      domain: [null, [Validators.required, Validators.minLength(5)]],
    });
    this.formGroup = new FormGroup({
      search: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.userData.UserList().subscribe(
      (res)=>{
        this.userlist = res.posts;
      },
      (error)=>{
        console.log(error)
      }
    );
    this.userData.userDomain().subscribe((res: any) =>
      {
      this.lists = new MatTableDataSource<any>(res.posts[0].domains);
      this.lists.paginator = this.paginator;
      this.isLoadingCompleted = true;
      this.lists.sort = this.sort;
      },
    (err: any) => 
     {
        console.log(err);
        this.isError = true;
        this.isLoadingCompleted = true ;
        this.DataLoadingStatus = "Error Fetching Data";
      });
  }

  filterList()
  {
    if(this.formGroup.value.search!=null && this.lists){
      this.lists.filter = this.formGroup.value.search.trim();
    }
  }

  clearFilter()
  {
    this.formGroup.patchValue({search:""});
    this.filterList();
  }

  Add(data:any){
    if (this.domainForm.valid){
    this.userData.createDomain(data).subscribe(
      (res)=>{this.alertservice.alert('Domain Successfully Created',1000,'success');},
      (error)=>{this.alertservice.alert('Error Creating Domain',1000,'danger');}
    );
    this.domainForm.reset()
    setTimeout(()=>{this.userData.userDomain().subscribe((res: any) => 
      {
      this.lists = new MatTableDataSource<domainModal>(res.posts[0].domains);
      this.lists.paginator = this.paginator;
      this.lists.sort = this.sort;})
    }, 1000)
  }}

  show(item: HTMLInputElement) {
    if(item.type == 'text'){
      item.type = 'password';
      item.nextSibling!.textContent = 'visibility';
    }
    else
      {item.type = 'text';
      item.nextSibling!.textContent = 'visibility_off';}
  }


  ResetForm(){
    this.domainForm.reset()
  }

  delete(data:any){
    let id = data.target.parentNode.parentNode.id;
    console.log(id);
    this.userData.deleteDomain({"id":id}).subscribe(
      (res)=>{this.alertservice.alert('Domain Deleted Successfully',1000,'success');},
      (error)=>{this.alertservice.alert('Error Deleting Domain',1000,'danger');}
    );
    setTimeout(()=>{this.userData.userDomain().subscribe((res: any) => 
      {
      this.lists = new MatTableDataSource<domainModal>(res.posts[0].domains);
      this.lists.paginator = this.paginator;
      this.lists.sort = this.sort;})
    }, 1000)
  }
  
  update(data:any){
    let id = data.target.parentNode.parentNode.id;
      let password = '';
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
              'abcdefghijklmnopqrstuvwxyz0123456789@#$';
        
      for (let i = 1; i <= 8; i++) {
          let char = Math.floor(Math.random()
                      * str.length + 1);
            
          password += str.charAt(char)
      }
      let res = {id , password}
      
    this.userData.changeDomain(res).subscribe(
      (res)=>{this.alertservice.alert('Password updated Successfully',1000,'success');},
      (error)=>{this.alertservice.alert('Error updating password',1000,'danger');}
    );
    setTimeout(()=>{this.userData.userDomain().subscribe((res: any) => 
      {
      this.lists = new MatTableDataSource<domainModal>(res.posts[0].domains);
      this.lists.paginator = this.paginator;
      this.lists.sort = this.sort;})
    }, 1000)
  }


  open(content2: any) 
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

  setID(e:any){
    this.domainID = e.target.parentNode.parentNode.id;
  }
    
  sendDomain(e:any){
       try{
        let id = this.domainID;
        let size: number = this.users.value?.length || 0;
        for(let i=0;i<size;i++)
        {
          if(this.users.value != null)
          {let userID = this.users.value[i]?.[0];
          let data = {"userID":userID , "domainID":id};
          this.userData.shareDomain(data).subscribe(
            (res:any)=>{
              if(res.statusCode == 409 && size == 1)
              {return this.alertservice.alert('Already Shared',1000,'warning');}
            },
            (err:any)=>{  
                return this.alertservice.alert('Error Sharing',1000,'warning');
            }
          );
          }
        }
        this.alertservice.alert('Domain Shared Successfully',1000,'success');
        this.users.setValue('');
      }
      catch(error){
        this.alertservice.alert('Error sharing domain',1000,'danger');
      }
  }

  confirm(data:any) {
    if (confirm("Are You Sure You Want to Delete") == true) {
      this.delete(data)
    } else {
    }
  }
}