import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LayoutComponent } from './core/layout/layout.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
      RouterModule,
      MatSidenavModule,
      MatListModule,
      LayoutComponent
    ],
})
export class AppComponent {

  title = 'angularwithasp.client';
}
