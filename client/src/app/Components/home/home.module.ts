import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {NavModule} from '../Nav/nav.module';

import {HomeComponent} from './home.component';
import {PostsComponent} from './posts.component';

@NgModule({
  imports: [CommonModule, NavModule, FormsModule],
  declarations: [HomeComponent, PostsComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
