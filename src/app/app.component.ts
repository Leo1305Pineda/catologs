import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.calcularteSunday([new Date(1901, 0, 1), new Date(2000, 11, 31)]);
    this.calcularteSunday([new Date(1901, 0, 1), new Date(2000, 11, 31)], 1);
  }

  /**
   * Calcula la cantidad de domingos en un rango de fechas
   * @param range arreglo de fecha
   * @param operation ajuste de saltos de dias; default 0: iteracion por dias, 1: iteracion por mes
   */
  calcularteSunday(range: any[] = [], operation = 0) {

    function getYearDiff(date1, date2) {
      return Math.abs(date2.getFullYear() - date1.getFullYear());
    }

    function formatDate(date) {
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }

    function addDays(date, days) {
      const day = new Date(date.getTime());
      day.setDate(day.getDate() + days);
      return day;
    }

    const difference = range[1].getTime() - range[0].getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));

    let countSunday = 0, iteration = 0;
    if (operation === 0) {
      for (let index = 0; index <= days; index++) {
        const day = addDays(range[0], index);
        if (day.getDay() === 0 && day.getDate() === 1) {
          countSunday++;
        }
        iteration++;
      }
    } else {
      for (let index = 0; index <= getYearDiff(range[0], range[1]); index++) {
        for (let m = 0; m < 12; m++) {
          const day = new Date(range[0].getFullYear() + index, m, 1);
          if (day.getDay() === 0) {
            countSunday++;
          }
          iteration++;
        }
      }

    }
    console.log(`Entre ${formatDate(range[0])} al ${formatDate(range[1])} existen ${countSunday} domingos, calculados con ${iteration} iteraciones`);

  }
}
