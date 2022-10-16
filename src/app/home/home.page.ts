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
