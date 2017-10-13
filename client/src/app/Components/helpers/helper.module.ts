
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CKEditorModule} from 'ng2-ckeditor';
import {InlineEditorComponent} from './inline.editor.component';

@NgModule({
  imports: [CKEditorModule, BrowserModule, FormsModule],
  declarations: [InlineEditorComponent],
  exports: [InlineEditorComponent]
})
export class HelperModule {}
