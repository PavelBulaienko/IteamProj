import { Component, OnInit, ViewChild } from '@angular/core';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {
  constructor() {}

  @ViewChild('days') days: any;
  @ViewChild('hours') hours: any;
  @ViewChild('mins') mins: any;
  @ViewChild('secs') secs: any;

  isTimerWorking = false;
  subscription = null;
  counter = 0;
  tempraryCounter = 0;
  clickOnWait = false;
  dblClickTimeout = null;
  timer = interval(1000);

  onStartStopBtnClick() {
    if (this.isTimerWorking === false) {
      if (this.counter !== 0) {
        this.counter = this.tempraryCounter;
      }
      this.startTimer();
      this.subscription = this.timer.subscribe(() => {
        this.counter += 1;
        this.renderTimer();
      });
    } else {
      this.counter = 0;
      this.offTimer();
      this.renderTimer();
    }
  }
  onWaitBtnClick() {
    // if (this.clickOnWait) {
    //   clearTimeout(this.dblClickTimeout);
    //   if (this.isTimerWorking === true && this.clickOnWait) {
    //     this.offTimer();
    //     this.tempraryCounter = this.counter;
    //   }
    // }
    // this.clickOnWait = true;
    // this.dblClickTimeout = setTimeout(() => {
    //   this.clickOnWait = false;
    // }, 300);

    if (this.clickOnWait) {
      if (this.isTimerWorking === true && this.clickOnWait) {
        this.offTimer();
        this.tempraryCounter = this.counter;
      }
    }
    this.clickOnWait = true;
    const waitForClickOnBtn = timer(300);
    waitForClickOnBtn.subscribe(() => {
      this.clickOnWait = false;
    });
  }
  onResetBtnClick() {
    this.counter = 0;
    this.offTimer();
    this.renderTimer();
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
  offTimer() {
    this.isTimerWorking = false;
    this.subscription.unsubscribe();
  }
  startTimer() {
    this.isTimerWorking = true;
  }

  renderTimer() {
    this.days.nativeElement.textContent = this.pad(
      this.transformInDays(this.counter)
    );

    this.hours.nativeElement.textContent = this.pad(
      this.transformInHours(this.counter)
    );

    this.mins.nativeElement.textContent = this.pad(
      this.transformInMins(this.counter)
    );

    this.secs.nativeElement.textContent = this.pad(
      this.transformInSecs(this.counter)
    );
  }
  transformInDays(time) {
    return Math.floor(time / (60 * 60 * 24));
  }
  transformInHours(time) {
    return Math.floor((time % (60 * 60 * 24)) / (60 * 60));
  }
  transformInMins(time) {
    return Math.floor((time % (60 * 60)) / 60);
  }
  transformInSecs(time) {
    return Math.floor(time % 60);
  }
  ngOnInit(): void {}
}
