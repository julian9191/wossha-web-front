import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('es');

@Pipe({name: 'fromDate'})
export class FromDatePipe implements PipeTransform {
  transform(date: string): string {
    return moment(new Date(date)).fromNow(); 
  }
}