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
  fileToUpload: File = null;

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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {
    console.log('registrationForm', this.registrationForm);
    const controls = this.registrationForm.controls;
    // const contact = {
    //   name: formData.inputName.value,
    //   email: formData.inputEmail.value,
    //   phone: formData.inputPhone.value.split(' ').join('').replace('(', '').replace(')', ''),
    //   position_id: 1,
    //   // position_id: formData.inputPosition.value,
    //   photo: formData.inputFile.value
    // };
    const formData = new FormData();
      formData.append('name', controls.inputName.value);
      formData.append('email', controls.inputEmail.value);
      formData.append('phone', controls.inputPhone.value.split(' ').join('').replace('(', '').replace(')', ''));
      formData.append('position_id', 1);
      formData.append('photo', this.fileToUpload);
    this.registrationForm.disable();
    this.fetchService.sendData(formData).subscribe(response => {
      if (response.success) {
        // this.showMsg(response.data.message);
        console.log('success')
      } else {
        // this.showMsg(response.success);
        console.log('error')
      }
    },
    (error) => {
      // this.showMsg(error.error.error.description);
      console.log(error)
    });
  }

  ngOnInit() {
    this.getPositions();

    this.registrationForm = new FormGroup({
      'inputName': new FormControl(null, [Validators.required]),
      'inputEmail': new FormControl(null, [Validators.required, Validators.email]),
      'inputPhone': new FormControl(null, [Validators.required]),
      'inputPosition': new FormControl(null, [Validators.required]),
      'inputFile': new FormControl(null, [Validators.required])
    });
  }

  ngOnDestroy() {
    if (this.positionsSub) {
      this.positionsSub.unsubscribe();
    }
  }
}
