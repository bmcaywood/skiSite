import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HelperModule} from '../helpers/helper.module';
import {NavModule} from '../Nav/nav.module';

import {CommentsComponent} from './comments.component';
import {HomeComponent} from './home.component';
import {PostsComponent} from './posts.component';
import {RatingsComponent} from './ratings.component';

@NgModule({
  imports: [CommonModule, NavModule, FormsModule, HelperModule],
  declarations:
      [HomeComponent, PostsComponent, RatingsComponent, CommentsComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
