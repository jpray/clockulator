import { extractUnits, normalizeTimeFromObject } from './utils';

export function add(time1, time2) {
  let {hours, minutes, ampm} = extractUnits(time1);
  const units2 = extractUnits(time2);
  const hours2 = units2.hours;
  const minutes2 = units2.minutes;
  const currentHoursIsLessThan12 = hours < 12;

  let newMinutes = minutes + minutes2;
  let newHours = hours + hours2;
  let newApmpm = ampm;
  let hoursDiff = 0;

  if (newMinutes > 59) {
    hoursDiff = Math.floor(newMinutes / 60);
    newMinutes = newMinutes % 60;
  }

  newHours = newHours + hoursDiff;
  let ampmDiff = 0;

  if (currentHoursIsLessThan12 && newHours > 11) {
    ampmDiff = Math.floor(newHours / 12);
  }

  if (newHours > 12 ) {
    newHours = newHours % 12;
    if (newHours === 0) {
      newHours = 12;
      ampmDiff++;
    }
  }

  for (let i=0;i<ampmDiff;i++) {
    ampm = ampm === ' AM' ? ' PM' : ' AM';
  }

  return normalizeTimeFromObject({
    hours: newHours,
    minutes: newMinutes,
    ampm: ampm
  });
}

export function subtract(time1, time2) {
  let {hours, minutes, ampm} = extractUnits(time1);
  const units2 = extractUnits(time2);
  const hours2 = units2.hours;
  const minutes2 = units2.minutes;

  let newMinutes = minutes - minutes2;
  let newHours = hours - hours2;
  let newApmpm = ampm;
  let hoursDiff = 0;
  if (newMinutes < 0) {
    hoursDiff = -1;
    newMinutes = 60 + newMinutes;
  }

  newHours = newHours + hoursDiff;
  let ampmDiff = 0;
  if (newHours < 0 ) {
    ampmDiff = -1;
    newHours = 11;
  }


  for (let i=0;i>ampmDiff;i--) {
    ampm = ampm === ' AM' ? ' PM' : ' AM';
  }

  return normalizeTimeFromObject({
    hours: newHours,
    minutes: newMinutes,
    ampm: ampm
  });
}
