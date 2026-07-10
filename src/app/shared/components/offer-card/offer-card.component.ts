import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {getRatingWidth} from '../../../core/utils/rating-width';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-offer-card',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './offer-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCardComponent {
  @Input({required: true}) offer!: OfferPreview;
  protected readonly getRatingWidth = getRatingWidth;
}
