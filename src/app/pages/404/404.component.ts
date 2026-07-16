import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AppRoute} from '../../core/constants/const';

@Component({
  selector: 'app-404',
  styleUrl: './404.component.css',
  imports: [RouterLink],
  templateUrl: '404.component.html',
})
export class NotFoundComponent {
  public readonly AppRoute = AppRoute;
}
