import { Pipe, PipeTransform } from '@angular/core';
import { normalizeTime } from './utils';
import { add } from './operations';

function convertTime12to24(time12h) {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return hours + ':' + minutes;
}

@Pipe({name: 'time'})
export class TimePipe implements PipeTransform {
  transform(value: string, modifier=''): string {
    let newVal = normalizeTime(value);
    if (modifier === 'noampm') {
      newVal = newVal.replace(' AM','').replace(' PM','');
    }
    if (newVal === '00:00') {
      newVal = '';
    }
    if (modifier === 'use24HourClock') {
      newVal = convertTime12to24(newVal);
    }

    if ((newVal.includes('07:09') || newVal.includes('19:09')) && modifier !== 'noampm') {
      return newVal + ' (our favorite time!)';
    }

    if ((newVal.includes('06:00')) && modifier !== 'noampm') {
      return newVal + ' (rise and shine!)';
    }

    if ((newVal.includes('12:00')) && modifier !== 'noampm') {
      return newVal + ' (mmmm, yummy lunch)';
    }

    if ((newVal.includes('19:00')) && modifier !== 'noampm') {
      return newVal + ' (bed time)';
    }

    if ((newVal.includes('20:00')) && modifier !== 'noampm') {
      return newVal + ' (night night)';
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
      value = value.replace('12:','00:');
      return '('+operator + ' ' + value+')';
    }
    return '';
  }
}
