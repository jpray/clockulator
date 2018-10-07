function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

export function normalizeTimeFromObject(obj: any) {
  let minutesPart = String(obj.minutes);
  if (minutesPart.length < 2) {
    obj.minutes = '0'+obj.minutes;
  }
  return normalizeTime('' + obj.hours + obj.minutes + obj.ampm);
}

export function normalizeTime(value: string): string {
    let isAm = value.includes('AM');
    value = value.replace(':','').replace(' AM','').replace(' PM','');
    let newVal = '00:00';
    let revVal = value.split("").reverse().join("");
    if (revVal[0]) {
      newVal = setCharAt(newVal, 4, revVal[0]);
    }
    if (revVal[1]) {
      newVal = setCharAt(newVal, 3, revVal[1]);
    }
    if (revVal[2]) {
      newVal = setCharAt(newVal, 1, revVal[2]);
    }
    if (revVal[3]) {
      newVal = setCharAt(newVal, 0, revVal[3]);
    }
    return newVal + (isAm ? ' AM' : ' PM');
  }

  export function extractUnits(time) {
    let ampm = '';
    if (time.includes(' AM')) {
      ampm = ' AM';
      time = time.replace(' AM','');
    } else if (time.includes(' PM')) {
      ampm = ' PM';
      time = time.replace(' PM','');
    }
    let nTime = normalizeTime(time);

    let hours = Number(nTime.charAt(0) + '' + nTime.charAt(1));
    let minutes = Number(nTime.charAt(3) + '' + nTime.charAt(4));
    return {hours, minutes, ampm};
  }
