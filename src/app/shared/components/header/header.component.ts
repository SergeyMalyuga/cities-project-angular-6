import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import {
  selectAuthStatus,
  selectEmail,
} from '../../../store/user/selectors/user.selectors';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../../../core/constants/const';
import { isAuth } from '../../../core/utils/auth-status';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private store = inject(Store<AppState>);
  protected readonly AppRoute = AppRoute;

  public authStatus = this.store.selectSignal(selectAuthStatus);
  public userEmail = this.store.selectSignal(selectEmail);
  protected readonly isAuth = isAuth;
}
