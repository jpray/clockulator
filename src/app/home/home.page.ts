import { Component } from '@angular/core';
import { add, subtract } from '../shared/operations';
import { extractUnits } from '../shared/utils';
import {Router} from "@angular/router";
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  totalValue;
  workingValue;
  repeatValue;
  currentOperation;
  repeatOperation;
  error;
  clock;
  use24HourClock;

  // Also accepts a function like our select method
//  @Select(state => state.app) app$: Observable<string[]>;

  constructor(private router: Router) {
    this.totalValue = '12:00 AM'
    this.workingValue = '0';
    this.repeatValue = this.workingValue;
    this.currentOperation = '';
    this.repeatOperation = '';
  }

  getClockValues() {
    let test = extractUnits(this.totalValue);
    return {
      hour: test.hours,
      minute: test.minutes,
      second: 0
    }
  }

  ngOnInit() {
    setInterval(()=> {
      //@ts-ignore
      window.clockulator = window.clockulator || {};
      //@ts-ignore
      this.use24HourClock = window.clockulator.use24HourClock;
    },100)
  }

  ngAfterContentInit() {
    setTimeout(() => {
      //@ts-ignore
      window.dyClock.prototype.getTime = function() {
        return this.getClockValues();
      }.bind(this);
      // @ts-ignore
      this.clock = new window.dyClock( "#analog-clock", {
        clock: 'analog',
        hand: 'hm',
        image: 'assets/dyclockjs/image/c01.png',
        radius: 80,
        analogStyle: {
               backgroundColor: "#fff",
               border: "none",
               handsColor: {
                   h: "#000",
                   m: "#000",
                   s: "transparent"
               },
               handsWidth: {
                   h: 6,
                   m: 3,
                   s: 1
               },
               roundHands: false,
               shape: "circle"
           }
      } );
      this.clock.drawAnalogClock();
      this.clock.runAnalogClock();

    },500)
  }

  validate() {
    if (Number(this.workingValue) > 1200) {
      this.error = 'Oops, this clockulator cannot add more than 12 hours at a time.  Please try a quantity of time less than or equal to 12:00.';
    } else {
      this.error = '';
    }
    return !this.error;
  }

  optionsClick() {
    window.location.href = '/options';
  }

  onEqualsClick() {
    let value;
    if (Number(this.workingValue)) {
      value = this.workingValue;
    } else if (Number(this.repeatValue)) {
      value = this.repeatValue;
    } else {
      value = '0';
    }

    if (this.currentOperation === '+') {
      this.totalValue = add(this.totalValue, value);
    } else if (this.currentOperation === '-') {
      this.totalValue = subtract(this.totalValue, value);
    } else if (this.repeatOperation === '+') {
      this.totalValue = add(this.totalValue, value);
    } else if (this.repeatOperation === '-') {
      this.totalValue = subtract(this.totalValue, value);
    }

    if (Number(this.workingValue) && !Number(this.repeatValue)) {
      debugger;
      this.repeatValue = this.workingValue;
      this.repeatOperation = this.currentOperation;
    }

    this.currentOperation = '';
    this.workingValue = '0';
  }

  onPlusClick() {
    this.repeatValue = '0';
    this.repeatOperation = '';
    this.onEqualsClick();
    this.repeatValue = '0';
    this.repeatOperation = '';
    this.currentOperation = '+';
  }

  onMinusClick() {
    this.repeatValue = '0';
    this.repeatOperation = '';
    this.onEqualsClick();
    this.repeatValue = '0';
    this.repeatOperation = '';
    this.currentOperation = '-';
  }

  onBackButton() {
    this.workingValue = this.workingValue.substring(0, this.workingValue.length - 1);
    if (!this.workingValue) {
      this.workingValue = '0';
    }
    this.validate();
  }

  buttonClick(key) {
    setTimeout(() => {
      this.clock.runAnalogClock();
    },0)
    if (key === '-' || key === '+' || key === '=') {

      if (!this.validate()) {
        return;
      }

      if (key === '+') {
        this.onPlusClick();
      }else if (key === '-') {
        this.onMinusClick();
      } else if (key === '=') {
        this.onEqualsClick();
      }
    } else if (key === 'C') {
        if (!this.currentOperation && !this.repeatOperation) {
          this.totalValue = '12:00 AM';
        }
        this.workingValue = '0';
        this.repeatValue = this.workingValue;
        this.currentOperation = '';
        this.repeatOperation = '';
        this.error = '';
    } else {
      if (this.workingValue.length > 3) {
        return;
      }
      this.workingValue = String(parseInt(this.workingValue + String(key),10));
    }
  }

}
