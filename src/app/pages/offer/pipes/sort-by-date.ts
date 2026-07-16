import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../../../core/models/comments';

@Pipe({
  name: 'sortByDate',
})
export class SortByDatePipe implements PipeTransform {
  transform(comments: Comment[]): Comment[] {
    if (!comments || comments.length === 0) {
      return [];
    }

    return [...comments].sort((a, b) => {
      const dataA = new Date(a.date).getTime();
      const dataB = new Date(b.date).getTime();

      const validDataA = Number.isNaN(dataA) ? 0 : dataA;
      const validDataB = Number.isNaN(dataA) ? 0 : dataB;

      return validDataB - validDataA;
    });
  }
}
