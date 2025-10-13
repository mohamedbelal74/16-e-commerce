// src/app/core/interceptors/loader.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

let requests = 0;

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);

  requests++;
  if (requests === 1) {
    spinner.show();
  }

  return next(req).pipe(
    finalize(() => {
      requests--;
      if (requests === 0) {
        spinner.hide();
      }
    })
  );
};
