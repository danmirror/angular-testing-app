import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {

  //set inital form control sync
  id_forms = new FormControl('');
  usernames = new FormControl('');
  emails = new FormControl('');
  citys = new FormControl('');
  nos = new FormControl('');

  //base API url
  private url ='http://localhost:4000/customer/api';
  private baseURL = 'http://localhost:4000/customer/api';

  private data:any = [];
  list_data:any=[];
  closeResult = '';
  
  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private route:Router
    ) { 
    // get data from API using GET
    this.http.get(this.url).subscribe((res)=>{
      this.data = res;
      
      console.log(res);
      this.list_data = this.data;
    })
    
  }

  //load data edit
  edit(content,id){
    //reload data from edit by ID
    this.id_forms.setValue(this.data[id]['_id']);
    this.usernames.setValue(this.data[id]['username']);
    this.emails.setValue(this.data[id]['email']);
    this.citys.setValue(this.data[id]['city']);
    this.nos.setValue(this.data[id]['no']);

    // modal close function
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {});

  }

  //initial data for grab value update in modal
  public id: string;
  public username: string;
  public email: string;
  public city: string;
  public no: string;

  // update data using xml httprequest using PUT method
  edit_submit() {
    var data =  "username="+this.username+
                "&email=" +this.email+
                "&city="+this.city+
                "&no="+this.no+
                "&id="+this.id;
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("PUT",this.baseURL);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);

    // get refresh data
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.route.navigate([currentUrl]);
    });
  }

  // delete data using xml httprequest using PUT method
  delete(id) {
    var data = "id="+id;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("DELETE",this.baseURL);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
    
    // get refresh data
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.route.navigate([currentUrl]);
    });
  }

  ngOnInit(): void {
  }

}
