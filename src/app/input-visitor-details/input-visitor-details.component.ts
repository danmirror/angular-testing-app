import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; // import router from angular router

@Component({
  selector: 'app-input-visitor-details',
  templateUrl: './input-visitor-details.component.html',
  styleUrls: ['./input-visitor-details.component.css']
})
export class InputVisitorDetailsComponent implements OnInit {

  //initial base URL API POST
  private baseURL = 'http://localhost:4000/customer/api';

  constructor(private route:Router) {     
  }
  
  //input data using xml httprequest
  onClickSubmit(result) {
    var data =  "username="+result.username+
                "&email=" +result.email+
                "&city="+result.city+
                "&no="+result.no;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST",this.baseURL);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
    
    // navigate to other page
    this.route.navigate(['/visitor-list']); 
  }

  ngOnInit(): void {
  }

}
