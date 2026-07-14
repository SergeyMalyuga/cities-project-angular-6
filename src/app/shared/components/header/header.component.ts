import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {
  selectAuthStatus,
  selectEmail,
} from '../../../store/user/selectors/user.selectors';
import {Router, RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../../core/constants/const';
import {isAuth} from '../../../core/utils/auth-status';
import {logout} from '../../../store/user/actions/user.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private store = inject(Store<AppState>);
  private router = inject(Router);

  protected readonly AppRoute = AppRoute;
  protected readonly isAuth = isAuth;

  public authStatus = this.store.selectSignal(selectAuthStatus);
  public userEmail = this.store.selectSignal(selectEmail);

  public logout() {
    if (this.isAuth(this.authStatus())) {
      this.store.dispatch(logout());
    }
  }
}
