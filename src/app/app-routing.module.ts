import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverlayComponent } from './overlay/overlay.component';
import { ScrollingComponent } from './scrolling/scrolling.component';

const appRoutes: Routes = [
  {
    path: 'overlay',
    component: OverlayComponent,
  },
  {
    path: 'scrolling',
    component: ScrollingComponent,
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: OverlayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
