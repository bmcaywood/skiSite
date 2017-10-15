
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CKEditorModule} from 'ng2-ckeditor';

import {InlineEditorComponent} from './inline.editor.component';
import {RatingComponent} from './rating.component';

@NgModule({
  imports: [CKEditorModule, BrowserModule, FormsModule],
  declarations: [InlineEditorComponent, RatingComponent],
  exports: [InlineEditorComponent, RatingComponent]
})
export class HelperModule {}
