import { extractUnits, normalizeTimeFromObject } from './utils';

import * as subHours from 'date-fns/sub_hours';
import * as subMinutes from 'date-fns/sub_minutes';
import * as addHours from 'date-fns/add_hours';
import * as addMinutes from 'date-fns/add_minutes';
import * as getHours from 'date-fns/get_hours';
import * as getMinutes from 'date-fns/get_minutes';

export function add(time1, time2) {
  let {hours, minutes, ampm} = extractUnits(time2);
  ampm = ' AM';

  var date = new Date(`December 17, 1995 ${time1}:00`);
  date = addMinutes(date, minutes);
  date = addHours(date, hours);
  let newHours = getHours(date);
  let newMinutes = getMinutes(date);

  if (newHours === 0) {
    newHours = 12;
    ampm = ' AM';
  } else if (newHours >= 12 ) {
    ampm = ' PM';
    if (newHours > 12) {
      newHours = newHours - 12;
    }
  }

  return normalizeTimeFromObject({
    hours: newHours,
    minutes: newMinutes,
    ampm: ampm
  });
}

export function subtract(time1, time2) {

  let {hours, minutes, ampm} = extractUnits(time2);
  ampm = ' AM';

  var date = new Date(`December 17, 1995 ${time1}:00`);
  date = subMinutes(date, minutes);
  date = subHours(date, hours);
  let newHours = getHours(date);
  let newMinutes = getMinutes(date);

  if (newHours === 0) {
    newHours = 12;
    ampm = ' AM';
  } else if (newHours >= 12 ) {
    ampm = ' PM';
    if (newHours > 12) {
      newHours = newHours - 12;
    }
  }

  return normalizeTimeFromObject({
    hours: newHours,
    minutes: newMinutes,
    ampm: ampm
  });
}
