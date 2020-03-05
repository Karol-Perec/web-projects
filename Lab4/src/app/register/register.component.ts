import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {businessAreas} from '../../assets/businessAreas';
import {ProfileService} from '../profile.service';
import {WorkshopsService} from '../workshops.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  businessAreas = businessAreas;
  registerForm;

  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private workshopsService: WorkshopsService,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      business: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      passwords: this.formBuilder.group({
        password: ['', Validators.required],
        passwordCheck: ['', Validators.required]
      }, {validator: this.checkPasswords})
    });
  }

  ngOnInit() {
  }

  onSubmit(userData) {
    this.profileService.setUserData(userData);
    this.registerForm.reset();
    this.workshopsService.clearUserWorkshops();
    this.router.navigate(['/panel']);
  }

  checkPasswords(group) {
    const pass = group.get('password').value;
    const passwordCheck = group.get('passwordCheck').value;
    return pass === passwordCheck ? null : {notSame: true};
  }

  shouldShowPasswordWarning() {
    return (this.registerForm.get('passwords').invalid && this.registerForm.get('passwords').get('passwordCheck').value);
  }

}
