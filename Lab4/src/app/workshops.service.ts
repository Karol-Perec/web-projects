import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {
  userWorkshops = [];

  constructor(
    private http: HttpClient
  ) {
  }

  addToUserWorkshops(workshop) {
    this.userWorkshops.push(workshop);
  }

  existsInUserWorkshops(workshop) {
    return this.userWorkshops.some(w => JSON.stringify(w) === JSON.stringify(workshop));
  }

  removeFromUserWorkshops(workshop) {
    this.userWorkshops.splice(this.userWorkshops.findIndex(w => JSON.stringify(w) === JSON.stringify(workshop)), 1);
  }

  getUserWorkshops(): any {
    return this.userWorkshops;
  }

  clearUserWorkshops() {
    this.userWorkshops = [];
  }

  getWorkshops() {
    return this.http.get('/assets/workshops.json');
  }
}
