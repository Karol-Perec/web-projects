import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userData;

  constructor() {
  }

  setUserData(userData) {
    this.userData = userData;
  }

  getUserData() {
    return this.userData;
  }
}
