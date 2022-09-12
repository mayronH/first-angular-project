import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Moment } from 'src/app/interfaces/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css'],
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string;

  submitted: boolean = false;

  @Input() momentData?: Moment;

  momentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // "constructor for angular"
    // this.momentForm = new FormGroup({
    //   id: new FormControl(''),
    //   title: new FormControl('', Validators.required),
    //   description: new FormControl('', Validators.required),
    //   image: new FormControl(''),
    // });
    this.momentForm = this.fb.group({
      id: [this.momentData ? this.momentData.id : ''],
      title: [
        this.momentData ? this.momentData.title : '',
        Validators.required,
      ],
      description: [
        this.momentData ? this.momentData.description : '',
        Validators.required,
      ],
      image: [this.momentData ? this.momentData.image : ''],
    });
  }

  onUploadFile(e: any) {
    const file: File = e.target.files[0];

    // add a new value to the form
    this.momentForm.patchValue({ image: file });
  }

  submitForm() {
    this.submitted = true;
    if (this.momentForm.invalid) return;

    // console.log(this.momentForm.value);
    this.onSubmit.emit(this.momentForm.value);
  }
}
