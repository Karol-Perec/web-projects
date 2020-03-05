import {Component, OnInit} from '@angular/core';
import {WorkshopsService} from '../workshops.service';

@Component({
  selector: 'app-user-workshops-info',
  templateUrl: './user-workshops-info.component.html',
  styleUrls: ['./user-workshops-info.component.css']
})
export class UserWorkshopsInfoComponent implements OnInit {
  userWorkshops;

  constructor(
    private workshopsService: WorkshopsService
  ) {
    this.userWorkshops = this.workshopsService.getUserWorkshops();
  }

  ngOnInit() {
  }

  getPrice() {
   return this.userWorkshops.reduce((a, b) => a + (b.price || 0), 0);
}

}
