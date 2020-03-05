import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WorkshopsService} from '../workshops.service';

@Component({
  selector: 'app-workshop-details',
  templateUrl: './workshop-details.component.html',
  styleUrls: ['./workshop-details.component.css']
})
export class WorkshopDetailsComponent implements OnInit {
  workshop;

  constructor(
    private route: ActivatedRoute,
    private workshopsService: WorkshopsService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('workshopId');
    this.workshopsService.getWorkshops().subscribe(data => this.workshop = data[id]);
  }

  addToUserWorkshops(workshop) {
    window.alert('Zapisałeś się na warsztat!');
    this.workshopsService.addToUserWorkshops(workshop);
  }

  removeFromUserWorkshops(workshop) {
    window.alert('Wypisałeś się z warsztatu!');
    this.workshopsService.removeFromUserWorkshops(workshop);
  }

  exists(workshop) {
    console.log(this.workshopsService.existsInUserWorkshops(workshop))
    return this.workshopsService.existsInUserWorkshops(workshop);
  }

}
