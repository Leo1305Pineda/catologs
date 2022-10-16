import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CatalogService } from '../core/services';
import { CatalogComponent } from '../shared/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isModal: boolean;
  list: any[] = [];

  print: any [] = [];
  isPrint: boolean;

  constructor(
    private modalCtrl: ModalController,
    private catalogoService: CatalogService
  ) { }

  get title(): string {
    return 'Catalogo de productos';
  }

  ngOnInit(): void {
    this.getCatalogs();
  }

  runCalculateSunday() {
    this.isPrint = !this.isPrint;
    this.print = this.isPrint ? new Array(
      this.calcularteSunday([new Date(1901, 0, 1), new Date(2000, 11, 31)]),
      this.calcularteSunday([new Date(1901, 0, 1), new Date(2000, 11, 31)], 1)
    ) : new Array();
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
    return `Entre ${formatDate(range[0])} al ${formatDate(range[1])} existen ${countSunday} domingos, calculados con ${iteration} iteraciones`;
  }

  getCatalogs() {
    const sub = this.catalogoService.getAll().subscribe((res: any) => {
      sub.unsubscribe();
      this.list = res;
    }, (err) => {
      sub.unsubscribe();
      console.error(err);
    });
  }

  async openCatalog(item: any = null) {
    if (this.isModal) {
      return;
    }
    this.isModal = true;
    const modal = await this.modalCtrl.create({
      component: CatalogComponent,
      componentProps: {
        item
      },
      cssClass: 'size-modal-contact',
    });
    modal.onDidDismiss().then((data) => {
      this.isModal = false;
      if (data) {
        this.getCatalogs()
      }
    });
    await modal.present();
  }

}
