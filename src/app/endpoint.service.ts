import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { timer } from 'rxjs-zone-less';

@Injectable()
export class EndpointService {
  readonly item$ = timer(500).pipe(
    switchMap(() =>
      of([
        {
          key: 4,
          value: 'Popularity',
        },
        {
          key: 1,
          value: 'Newest',
        },
        {
          key: 2,
          value: 'Price Low to High',
        },
        {
          key: 3,
          value: 'Price High to Low',
        },
        {
          key: 6,
          value: 'Discount High to Low',
        },
        {
          key: 7,
          value: 'Last Updated',
        },
      ])
    )
  );

  constructor() {}
}
