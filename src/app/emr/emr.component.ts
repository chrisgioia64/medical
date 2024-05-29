import { Component, OnInit } from '@angular/core';
import { EmrService } from '../emr.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-emr',
  templateUrl: './emr.component.html',
  styleUrl: './emr.component.css',
  providers: [EmrService],
  standalone: true,
  imports: [
    CommonModule, RouterOutlet,
    ReactiveFormsModule
  ]
})
export class EmrComponent implements OnInit {

  formGroup : FormGroup;

  name : string = "";
  age : string = "";
  gender : string = "";
  causes : string = "";
  symptoms : string = "";
  diagnostics : string = "";
  treatment : string = "";
  preventative_measures : string = "";
  next_steps : string = "";

  constructor(private emrService : EmrService) {
    this.formGroup = new FormGroup({
      textArea: new FormControl(null),
      submitButton: new FormControl(null)
    });
  }

  ngOnInit(): void {
    let observable = this.emrService.getApiResponse();
    observable.subscribe( value => {
      console.log(value);
    });
  }

  generateText() {
    let textArea = this.formGroup.get('textArea');
    // console.log("text: " + textArea!.value);
    let observable2 = this.emrService.generateText(textArea!.value);
    observable2.subscribe( (response : any) => {
      let message = response.choices[0].message.content;
      const jsonObject = JSON.parse(message);
      console.log(jsonObject);
      this.name = jsonObject['Name'];
      this.age = jsonObject['Age'];
      this.gender = jsonObject['Gender'];
      this.causes = jsonObject['Causes'];
      this.symptoms = jsonObject['Symptoms'];
      this.diagnostics = jsonObject['Diagnostics'];
      this.treatment = jsonObject['Treatment'];
      this.preventative_measures = jsonObject['Preventative Measures'];
      this.next_steps = jsonObject['Next Steps'];
    });
  }

}
