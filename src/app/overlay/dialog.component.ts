import { Component } from '@angular/core';

@Component({
  selector: 'app-overlay-dialog',
  template: `
    <h4
      [ngStyle]="{
        border: '1px solid #ccc',
        height: '100%',
        width: ' 100%',
        background: 'rgba(0, 0, 0, .1)'
      }"
    >
      跟随鼠标展示的弹窗层
    </h4>
  `,
})
export class OverlayDialogComponent {}
