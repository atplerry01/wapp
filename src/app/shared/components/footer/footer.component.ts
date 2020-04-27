import { Component, OnInit  } from '@angular/core';
import { UtilityService } from '../../service/utility.service';


// You add it here
// import * as $ from 'jquery';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit  {


  constructor(public utitilityService: UtilityService) {

   }

  ngOnInit() {
  

  }



  

}




