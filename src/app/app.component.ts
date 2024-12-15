import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
      RouterModule,
      MatSidenavModule,
      MatListModule,
      ToolbarComponent,
      SidenavComponent
    ],
})
export class AppComponent {

  title = 'angularwithasp.client';
}
