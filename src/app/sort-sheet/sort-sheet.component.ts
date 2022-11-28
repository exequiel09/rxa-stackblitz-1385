import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  NgZone,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { ForModule } from '@rx-angular/template/for';
import { UnpatchModule } from '@rx-angular/template/unpatch';

import { EndpointService } from '../endpoint.service';

@Component({
  selector: 'app-sort-sheet',
  templateUrl: './sort-sheet.component.html',
  styleUrls: ['./sort-sheet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortSheetComponent {
  constructor(public readonly endpointService: EndpointService) {
    console.log('DEBUG:: sort sheet constructor', NgZone.isInAngularZone());
  }

  handleClick(item: any) {
    console.log('Clicked item: ', item);
  }

  trackByKey(_idx: number, item: { key: string | number; value: any }) {
    return item.key;
  }
}

@NgModule({
  imports: [CommonModule, MatListModule, ForModule, UnpatchModule],
  declarations: [SortSheetComponent],
  exports: [SortSheetComponent],
})
export class SortSheetComponentModule {}
