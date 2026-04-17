import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-any-timer-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './any-timer-demo.component.html',
  styleUrl: './any-timer-demo.component.scss'
})
export class AnyTimerDemoComponent implements OnInit, OnDestroy {
  isRunning = false;
  timeLeft = 120; // 2 minutes in seconds
  displayTime = '00:02:00';
  private intervalId: any = null;

  ngOnInit() {
    this.updateDisplay();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  toggleTimer() {
    if (this.isRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  private startTimer() {
    this.isRunning = true;
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateDisplay();
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  private stopTimer() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private updateDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    const hours = Math.floor(minutes / 60);
    const displayMinutes = minutes % 60;

    this.displayTime = `${this.pad(hours)}:${this.pad(displayMinutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
