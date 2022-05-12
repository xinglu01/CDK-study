import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverlayDialogComponent } from './overlay/dialog.component';
import { OverlayComponent } from './overlay/overlay.component';
import { ScrollingComponent } from './scrolling/scrolling.component';

const CDK_COMPONENT = [
  OverlayComponent,
  ScrollingComponent,
  OverlayDialogComponent,
];

@NgModule({
  declarations: [AppComponent, ...CDK_COMPONENT],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
