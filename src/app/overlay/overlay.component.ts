import {
  Component,
  ElementRef,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
  Optional,
  ViewContainerRef,
} from '@angular/core';
import {
  FlexibleConnectedPositionStrategy,
  FlexibleConnectedPositionStrategyOrigin,
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayRef,
  ViewportRuler,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayDialogComponent } from './dialog.component';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  providers: [Overlay],
})
export class OverlayComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  private overlayRef: OverlayRef | undefined;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
    private _viewportRuler: ViewportRuler,
    @Optional() @Inject(DOCUMENT) private _document: any,
    private _platform: Platform,
    private _overlayContainer: OverlayContainer,
    private elementRef: ElementRef
  ) {}

  createOverlay(config?: {
    x: number;
    y: number;
    origin: ElementRef | Element;
  }) {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
    // config
    const otherConfig = new OverlayConfig({
      hasBackdrop: true,
      width: 200,
      height: 200,
      panelClass: 'cdk-demo-panel-container',
      positionStrategy: this.overlay.position().global(),
    });

    // position
    if (config) {
      const origin: FlexibleConnectedPositionStrategyOrigin = {
        x: config.x,
        y: config.y,
      };
      const positionStrategy = new FlexibleConnectedPositionStrategy(
        origin,
        this._viewportRuler,
        this._document,
        this._platform,
        this._overlayContainer
      );
      otherConfig.positionStrategy = positionStrategy;
      positionStrategy.withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);
      positionStrategy.withGrowAfterOpen(true);
    }

    // create
    this.overlayRef = this.overlay.create(otherConfig);
    const myPortal = new ComponentPortal(
      OverlayDialogComponent,
      this.viewContainerRef,
      this.injector
    );
    this.overlayRef.attach(myPortal);
  }

  ngOnInit(): void {
    fromEvent(document, 'click')
      .pipe(takeUntil(this.destroy$))
      .subscribe((e: Event) => {
        if (this.elementRef.nativeElement.contains(e.target)) {
          return;
        }
        const position = {
          x: (e as MouseEvent).pageX,
          y: (e as MouseEvent).pageY,
          origin: e.target as Element,
        };
        this.createOverlay(position);
      });
  }

  buttonClick() {
    this.createOverlay();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
