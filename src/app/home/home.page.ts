import { Component } from '@angular/core';
import { add, subtract } from '../shared/operations';

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

  constructor() {
    this.totalValue = '12:00 AM'
    this.workingValue = '0';
    this.repeatValue = this.workingValue;
    this.currentOperation = '';
  }

  validate() {
    if (Number(this.workingValue) > 1200) {
      this.error = 'Oops, this clockulator cannot add more than 12 hours at a time.  Please try a quantity of time less than or equal to 12 hours.';
    } else {
      this.error = '';
    }
    return !this.error;
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
    }

    if (Number(this.workingValue) && !Number(this.repeatValue)) {
      this.repeatValue = this.workingValue;
    }

    this.workingValue = '0';
  }

  onPlusClick() {
    this.repeatValue = '0';
    this.onEqualsClick();
    this.repeatValue = '0';
    this.currentOperation = '+';
  }

  onMinusClick() {
    this.repeatValue = '0';
    this.onEqualsClick();
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
      this.workingValue = '0';
      this.repeatValue = this.workingValue;
      this.totalValue = '12:00 AM';
      this.currentOperation = '';
    } else {
      if (this.workingValue.length > 3) {
        return;
      }
      this.workingValue = String(parseInt(this.workingValue + String(key),10));
    }
  }

}
