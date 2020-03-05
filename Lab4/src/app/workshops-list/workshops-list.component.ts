import {Component, OnInit} from '@angular/core';
import {WorkshopsService} from '../workshops.service';

@Component({
  selector: 'app-workshops-list',
  templateUrl: './workshops-list.component.html',
  styleUrls: ['./workshops-list.component.css']
})
export class WorkshopsListComponent implements OnInit {
  workshops;

  constructor(
    private workshopsService: WorkshopsService
  ) {
  }

  ngOnInit() {
    this.workshops = this.workshopsService.getWorkshops();
  }
}
