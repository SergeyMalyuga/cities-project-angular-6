import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Credentials} from '../../core/models/credentials';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {first} from 'rxjs';
import {AppRoute, AuthorizationStatus, CITY_LOCATIONS} from '../../core/constants/const';
import {Router, RouterLink} from '@angular/router';
import {loadOffers} from '../../store/offer/actions/offer.actions';
import {login} from '../../store/user/actions/user.actions';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {changeCity} from '../../store/city/actions/city.actions';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);

  public randomCity = this.getRandomCity();
  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$')]],
  });

  public get emailControl() {
    return this.loginForm.get('email');
  }

  public get passwordControl() {
    return this.loginForm.get('password');
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      const credentials: Credentials = {email, password};
      this.store.dispatch(login({credentials}));
    }
  }

  public changeCity() {
    this.store.dispatch(changeCity({city: this.randomCity}));
    this.router.navigate([AppRoute.MAIN]);
  }

  private getRandomCity() {
    const index = Math.floor(Math.random() * CITY_LOCATIONS.length);
    return CITY_LOCATIONS[index];
  }

  public ngOnInit(): void {
    this.store.select(selectAuthStatus).pipe(
      first(authStatus => authStatus === AuthorizationStatus.AUTH),
      takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.store.dispatch(loadOffers());
        this.loginForm.reset();
        this.router.navigate([AppRoute.MAIN]);
      })
  }

  protected readonly AppRoute = AppRoute;
}
