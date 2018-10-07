import { Pipe, PipeTransform } from '@angular/core';
import { normalizeTime } from './utils';
import { add } from './operations';

@Pipe({name: 'time'})
export class TimePipe implements PipeTransform {
  transform(value: string, modifier=''): string {
    let newVal = normalizeTime(value);
    if (modifier === 'noampm') {
      newVal = newVal.replace(' AM','').replace(' PM','');
    }
    if (newVal.includes('7:09')) {
      return newVal + ' (our favorite time!)';
    }
    if (newVal.includes(':54')) {
      return newVal + '!!!';
    }
    return newVal;
  }
}

@Pipe({name: 'repeat'})
export class RepeatPipe implements PipeTransform {
  transform(value: string, operator: string): string {
    if (Number(value)) {
      value = add('00:00', value).replace(' AM','').replace(' PM','');
      return '('+operator + ' ' + value+')';
    }
    return '';
  }
}
