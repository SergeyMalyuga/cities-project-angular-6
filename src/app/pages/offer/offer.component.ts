import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Offer, OfferPreview} from '../../core/models/offers';
import {catchError, combineLatest, EMPTY, filter, map, merge, of, Subject, switchMap, tap} from 'rxjs';
import {Comment} from '../../core/models/comments';
import {OfferDataService} from '../../core/services/offer-data.service';
import {AppRoute, QUANTITY_FIRST_OFFERS} from '../../core/constants/const';
import {DatePipe, NgClass, SlicePipe, TitleCasePipe} from '@angular/common';
import {isEnableActiveMark} from '../../core/utils/enable-active-mark';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {OfferService} from '../../core/services/offer.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {getRatingWidth} from '../../core/utils/rating-width';
import {CommentService} from '../../core/services/comment.service';
import {CommentFormComponent} from '../../components/comment-form/comment-form.component';
import {SortByDatePipe} from './pipes/sort-by-date';
import {isAuth} from '../../core/utils/auth-status';
import {MapComponent} from '../../shared/components/map/map.component';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {ScrollUpDirective} from '../../shared/directives/scroll-up.directive';
import {LoaderComponent} from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-offer',
  imports: [HeaderComponent, NgClass, TitleCasePipe, DatePipe, CommentFormComponent, SortByDatePipe, SortByDatePipe, MapComponent, SlicePipe, OfferCardComponent, ScrollUpDirective, LoaderComponent],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit {
  private activatedRouter = inject(ActivatedRoute);
  private refreshOffer$ = new Subject<void>();
  private refreshComments$ = new Subject<void>();
  private refreshNearbyOffers$ = new Subject<void>();
  private offerDataService = inject(OfferDataService);
  private offerService = inject(OfferService);
  private commentService = inject(CommentService);
  private router = inject(Router);
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  protected readonly isEnableActiveMark = isEnableActiveMark;
  protected readonly getRatingWidth = getRatingWidth;
  protected readonly isAuth = isAuth;
  protected readonly QUANTITY_FIRST_OFFERS = QUANTITY_FIRST_OFFERS;

  public offer = signal<Offer | null>(null);
  public comments = signal<Comment[]>([]);
  public nearbyOffers = signal<OfferPreview[]>([]);
  public authStatus = this.store.selectSignal(selectAuthStatus);
  public isToggleStatus = signal<boolean>(false);
  public isNearbyOffersLoading = signal<boolean>(false);
  public readonly bedrooms = computed(() => this.offer()?.bedrooms ?? 0);
  public readonly maxAdults = computed(() => this.offer()?.maxAdults ?? 0);
  public readonly offerId = computed(() => this.offer()?.id ?? null);

  ngOnInit(): void {
    this.activatedRouter.paramMap.pipe(map(params => params.get('id')),
      filter((id): id is string => id !== null),
      switchMap(id => {
        const offer$ = merge(
          this.offerDataService.getOfferById(id),
          this.refreshOffer$.pipe(
            switchMap(() => this.offerDataService.getOfferById(id).pipe(
                catchError(() => {
                  this.router.navigate([AppRoute.MAIN]);
                  return EMPTY
                }),
              )
            ))
        );

        const nearbyOffers$ = merge(
          this.offerDataService.getNearbyOffers(id),
          this.refreshNearbyOffers$.pipe(switchMap(() => this.offerDataService.getNearbyOffers(id)
            .pipe(catchError(() => of([])))),
          )
        );

        const comments$ = merge(
          this.commentService.getComments(id),
          this.refreshComments$.pipe(switchMap(() => this.commentService.getComments(id)
            .pipe(catchError(() => of([])))))
        )

        return combineLatest({offer: offer$, nearbyOffers: nearbyOffers$, comments: comments$})
      }), takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      this.offer.set(result.offer);
      this.nearbyOffers.set(result.nearbyOffers);
      this.comments.set(result.comments);
      this.isToggleStatus.set(false);
      this.isNearbyOffersLoading.set(false);
    })
  }

  public toggleFavoriteStatus() {
    const offer = this.offer();
    if (offer) {
      this.isToggleStatus.set(true);
      this.offerService.toggleFavorite(offer.id, !offer.isFavorite).pipe(
        filter((success) => success !== null),
        tap((success) => {
          if (success) {
            this.refreshOffer$.next();
          } else {
            this.isToggleStatus.set(false);
          }
        }),
        catchError(() => {
          this.isToggleStatus.set(false);
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
    }
  }

  public refreshComments() {
    this.refreshComments$.next();
  }

  public refreshNearbyOffers() {
    this.isNearbyOffersLoading.set(true);
    this.refreshNearbyOffers$.next();
  }
}
