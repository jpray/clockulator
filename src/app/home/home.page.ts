import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {
    this.totalValue = ''
    this.workingValue = '0';
  }

  buttonClick(key) {
    if (key === '-' || key === '+' || key === '=') {

    } else if (key === 'C') {
      this.workingValue = '0';
    } else {
      if (this.workingValue.length > 3) {
        return;
      }
      this.workingValue = String(parseInt(this.workingValue + String(key),10));
    }
    debugger;
  }

}
