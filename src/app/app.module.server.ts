import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { EmrComponent } from './emr/emr.component';

@NgModule({
  declarations: [
  ],
  imports: [
    ServerModule,
    ReactiveFormsModule,
    EmrComponent
  ],
  bootstrap: [AppComponent],
  exports: [
    ReactiveFormsModule
  ]
})
export class AppServerModule {}
