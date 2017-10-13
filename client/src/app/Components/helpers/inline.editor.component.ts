import { Component, Output, Input, EventEmitter } from '@angular/core';
import {CKEditorComponent} from 'ng2-ckeditor';

  @Component({
  selector: 'app-inline-editor',
  template: `
  <ckeditor
    [(ngModel)]="editorContent"
    [config]="ckConfig"
    (blur)="onBlur($event)"
    debounce="500">
  </ckeditor>
  `,
})
export class InlineEditorComponent {
    @Output('inlineContent') inlineContent: EventEmitter<string> = new EventEmitter<string>();
    @Input() editorContent: string;
    public ckConfig: {} = {
      uiColor: '#a4a4a4',
      toolbarGroups: [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] }
      ],
      removeButtons: 'Save,NewPage,Preview,Print,Templates,PasteText,PasteFromWord,Replace,SelectAll,BidiLtr,BidiRtl,Language,Flash,Strike,Subscript,Superscript,CopyFormatting,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,About,CreateDiv,Iframe,PageBreak'
    };

    constructor() {
    }

    public onBlur(e: any) {
        this.inlineContent.emit(this.editorContent);
    }
}
