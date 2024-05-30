import { Component, OnInit } from '@angular/core';
import { EmrService } from '../emr.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule, ProgressBarMode } from "@angular/material/progress-bar";
import { MatDivider, MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

export interface MyElement {
  entity: string;
  value: string;
}

@Component({
  selector: 'app-emr',
  templateUrl: './emr.component.html',
  styleUrl: './emr.component.css',
  providers: [EmrService],
  standalone: true,
  imports: [
    CommonModule, RouterOutlet,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDivider,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatProgressSpinnerModule
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
  showTable = false;
  showSpinner = false;

  ELEMENT_DATA: MyElement[] = [
    {entity: 'Name', value: ''},
    {entity: 'Age', value: ''},
    {entity: 'Gender', value: ''},
    {entity: 'Causes', value: ''},
    {entity: 'Symptoms', value: ''},
    {entity: 'Diagnostics', value: ''},
    {entity: 'Treatment', value: ''},
    {entity: 'Preventative Measures', value: ''},
    {entity: 'Next Steps', value: ''},
  ];

  displayedColumns: string[] = ['entity', 'value'];
  dataSource = this.ELEMENT_DATA;

  constructor(private emrService : EmrService) {
    this.formGroup = new FormGroup({
      textArea: new FormControl(null),
      submitButton: new FormControl(null)
    });
  }

  ngOnInit(): void {

  }

  generateText() {
    this.showSpinner = true;
    let textArea = this.formGroup.get('textArea');
    console.log("text: " + textArea!.value);
    let observable2 = this.emrService.generateText(textArea!.value);
    observable2.subscribe( (response : any) => {
      let message = response.choices[0].message.content;
      console.log(message);
      const jsonObject = JSON.parse(message);
      console.log(jsonObject);
      this.showSpinner = false;
      this.name = jsonObject['Name'];
      this.age = jsonObject['Age'];
      this.gender = jsonObject['Gender'];
      this.causes = jsonObject['Causes'];
      this.symptoms = jsonObject['Symptoms'];
      this.diagnostics = jsonObject['Diagnostics'];
      this.treatment = jsonObject['Treatment'];
      this.preventative_measures = jsonObject['Preventative Measures'];
      this.next_steps = jsonObject['Next Steps'];

      this.ELEMENT_DATA[0]['value'] = this.name;
      this.ELEMENT_DATA[1]['value'] = this.age;
      this.ELEMENT_DATA[2]['value'] = this.gender;
      this.ELEMENT_DATA[3]['value'] = this.causes;
      this.ELEMENT_DATA[4]['value'] = this.symptoms;
      this.ELEMENT_DATA[5]['value'] = this.diagnostics;
      this.ELEMENT_DATA[6]['value'] = this.treatment;
      this.ELEMENT_DATA[7]['value'] = this.preventative_measures;
      this.ELEMENT_DATA[8]['value'] = this.next_steps;

      this.showTable = true;
    });
  }

}
