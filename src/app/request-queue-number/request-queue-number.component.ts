import { Component, OnInit  } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DisplayTextModel } from '@syncfusion/ej2-angular-barcode-generator';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-request-queue-number',
  templateUrl: './request-queue-number.component.html',
  styleUrls: ['./request-queue-number.component.css']
})
export class RequestQueueNumberComponent implements OnInit {

  private url ='http://localhost:4000/customer/api';
  private data:any = [];

  public displayText: DisplayTextModel;

  list_data:any=[];
  list_barcode:any=[];
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
  ) { 
    //get data from api with object name customer
    this.http.get(this.url).subscribe((res)=>{
      this.data = res;
      this.list_data = this.data;
    })
    
  }
  show(content,id){
    this.list_barcode = this.list_data[id];

    //set barcode value
    this.displayText = {
      text: id+1
    }

    //close modal style
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
    });
  }

  ngOnInit(): void {
    this.displayText = {
      text:'0'
    }
  }

}
