import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { UtilityService } from '../../service/utility.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser = '';
  greetings = '';
  now = new Date();

  constructor(private dataService: DataService, private utilityService: UtilityService) {

  }

  ngOnInit() {
    const user = this.dataService.getCurrentUser();
    this.currentUser = user.displayName;

    const hr =this.now.getHours();
    if(hr<12){
      this.greetings = 'Morning';
    }else if(hr>=12 && hr<17){
      this.greetings = 'Afternoon';
    }
    else if(hr>=17 && hr<=23){
      this.greetings = 'Evening';
    }
    
  }

  gohome() {
    this.utilityService.navigate('/sc/home');
  }

  logout() {
    this.dataService.logout();
  }

}




