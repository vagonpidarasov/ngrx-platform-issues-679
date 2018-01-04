import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppContainerComponent } from './app-container.component';
import {MainReducer} from './reducer';

@NgModule({
    bootstrap: [AppContainerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [BrowserModule, StoreModule.forRoot({MainReducer})],
    declarations: [AppContainerComponent],
})
export class AppContainerModule {}
