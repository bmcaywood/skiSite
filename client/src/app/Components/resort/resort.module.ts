import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HelperModule} from '../helpers/helper.module';
import {NavModule} from '../Nav/nav.module';
import {ResortComponent} from './resort.component';
import {SkillLevelComponent} from './skill-level.component';

@NgModule({
  imports: [CommonModule, NavModule, FormsModule, HelperModule],
  declarations: [ResortComponent, SkillLevelComponent],
  exports: [ResortComponent, SkillLevelComponent]
})
export class ResortModule {}
