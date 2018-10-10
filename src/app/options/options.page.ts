import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage {

  use24HourClock;

  constructor(private router: Router) {
    this.use24HourClock = true;
  }

  ngOnInit() {
    setInterval(() => {
      //@ts-ignore
      window.clockulator = window.clockulator || {};
      //@ts-ignore
      window.clockulator.use24HourClock = this.use24HourClock;
    },100)
  }

  goBack() {
    this.router.navigate(['home']);
  }

}
