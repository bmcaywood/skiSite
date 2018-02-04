import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {} from '../helpers/helper.module';

import {NavComponent} from './nav.component';
import {SideNavComponent} from './sideNav.component';

@NgModule({
  imports: [CommonModule, NgbModule],
  declarations: [NavComponent, SideNavComponent],
  providers: [],
  exports: [NavComponent, SideNavComponent]
})
export class NavModule {}
