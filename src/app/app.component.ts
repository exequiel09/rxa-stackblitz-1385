import {
  Component,
  NgZone,
  Self,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { defer, exhaustMap, merge, observeOn, Subject, switchMap } from 'rxjs';

import { RxEffects } from '@rx-angular/state/effects';
import { enterNgZone } from 'ngx-rxjs-zone-scheduler';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EndpointService } from './endpoint.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EndpointService],
  viewProviders: [RxEffects],
})
export class AppComponent {
  @ViewChild('sheetSlot', { static: false, read: ViewContainerRef })
  sheetSlot!: ViewContainerRef;

  private readonly _showSheet$ = new Subject<void>();

  constructor(
    @Self() private readonly _effects: RxEffects,
    private readonly _bottomSheet: MatBottomSheet,
    private readonly _ngZone: NgZone
  ) {
    this._effects.register(
      this._showSheet$.asObservable().pipe(
        exhaustMap(() =>
          defer(() => {
            console.log('Import promise NgZone = ', NgZone.isInAngularZone());
            return import('./sort-sheet/sort-sheet.component');
          }).pipe(
            observeOn(enterNgZone(this._ngZone)),

            switchMap(({ SortSheetComponent }) => {
              console.log(
                'Sheet construction NgZone = ',
                NgZone.isInAngularZone()
              );

              const sheetRef = this._bottomSheet.open(SortSheetComponent, {
                panelClass: '-rounded',
                viewContainerRef: this.sheetSlot,
              });

              return merge(sheetRef.afterDismissed());
            })
          )
        )
      )
    );
  }

  showSheet() {
    this._showSheet$.next();
  }
}
