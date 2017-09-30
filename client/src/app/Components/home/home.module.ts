import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavModule } from '../Nav/nav.module';
import { PostsComponent } from './posts.component';

@NgModule({
  imports: [
    CommonModule,
    NavModule
  ],
  declarations: [HomeComponent, PostsComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
