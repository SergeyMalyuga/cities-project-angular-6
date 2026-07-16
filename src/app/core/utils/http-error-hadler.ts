import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

export function httpErrorHandler(error: HttpErrorResponse): Observable<never> {
  console.error(error);
  return throwError(() => error.message);
}
