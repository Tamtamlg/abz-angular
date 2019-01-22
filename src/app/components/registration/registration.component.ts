import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  positionsSub: Subscription;
  positions: Position[] = [];
  openSelect = false;
  selectedPosition = '';
  positionId = '';
  registrationForm: FormGroup;

  constructor(
    private fetchService: FetchService
  ) { }

  getPositions() {
    this.positionsSub = this.fetchService.getPositions().subscribe((response) => {
      this.positions = response.positions;
    });
  }

  changeSelectedPosition(position, id) {
    this.registrationForm.get('inputPosition').setValue(position);
    this.selectedPosition = position;
    this.positionId = id;
  }

  toggleSelect() {
    this.openSelect = !this.openSelect;
  }

  onSubmit() {
    console.log('registrationForm', this.registrationForm);
    // const formData = this.registrationForm.controls;
    // const otherValue = formData.other.value ? formData.other.value : 'Other';
    // const contact = {
    //   description: formData.description.value,
    //   email: formData.userEmail.value,
    //   enquiry_type: this.other ? otherValue : formData.enquiryType.value.name,
    //   file: formData.fileImg.value,
    //   subject: formData.subject.value,
    //   user_name: formData.userName.value
    // };
  }

  ngOnInit() {
    this.getPositions();

    this.registrationForm = new FormGroup({
      'inputName': new FormControl,
      'inputEmail': new FormControl,
      'inputPhone': new FormControl,
      'inputPosition': new FormControl,
      'inputFile': new FormControl
    });
  }

  ngOnDestroy() {
    if (this.positionsSub) {
      this.positionsSub.unsubscribe();
    }
  }
}
