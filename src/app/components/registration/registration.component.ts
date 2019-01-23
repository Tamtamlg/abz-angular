import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FetchService } from 'src/app/services/fetch.service';
import { RegistrationService } from 'src/app/services/registration.service';

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
    private fetchService: FetchService,
    private registrationService: RegistrationService
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
    const controls = this.registrationForm.controls;
    const formData = new FormData();
      formData.append('name', controls.inputName.value);
      formData.append('email', controls.inputEmail.value);
      formData.append('phone', '+380' + controls.inputPhone.value.split(' ').join('').replace('(', '').replace(')', ''));
      formData.append('position_id', this.positionId);
      formData.append('photo', this.fileToUpload, this.fileToUpload.name);
    this.registrationForm.disable();
    this.fetchService.sendData(formData).subscribe(response => {
      if (response.success) {
        // this.showMsg(response.data.message);
        console.log('success');
        this.registrationService.newEvent('updateUsers');
      } else {
        // this.showMsg(response.success);
        console.log('error');
      }
      this.registrationForm.enable();
    },
    (error) => {
      // this.showMsg(error.error.error.description);
      console.log(error);
      this.registrationForm.enable();
    });
  }

  ngOnInit() {
    this.getPositions();

    this.registrationForm = new FormGroup({
      'inputName': new FormControl(null, [Validators.required, Validators.maxLength(60), Validators.minLength(2)]),
      'inputEmail': new FormControl(null, [Validators.required, Validators.email]),
      'inputPhone': new FormControl(null, [Validators.required, Validators.minLength(9)]),
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
