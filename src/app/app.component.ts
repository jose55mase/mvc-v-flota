import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';



import { FormControl, FormGroup, Validators } from '@angular/forms';





//declare var jquery:any;
//declare $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent{
  usuarioLogMenu : boolean = true;
}
