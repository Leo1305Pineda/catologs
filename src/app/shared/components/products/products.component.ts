import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CatalogService } from 'src/app/core/services';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  @Input() catalogId: string;
  @Input() disabled: boolean;
  list: any[] = [];
  isModal: boolean;
  @Output() onOpenProduct = new EventEmitter<any>();

  constructor(
    private modalCtrl: ModalController,
    private catalogService: CatalogService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    const arrayParams = [];
    const sub = this.catalogService.getProducts(this.catalogId, arrayParams).subscribe((res) => {
      sub.unsubscribe();
      console.log(res);
      this.list = res;
    }, (err) => {
      sub.unsubscribe();
      console.error(err);
    });
  }

  handleChange(event) {
    console.log(event.detail.value)
    let arrayParams = [`name,${event.detail.value}`];
    /*const sub = this.catalogService.getAllParams(arrayParams).subscribe((res) => {
      sub.unsubscribe();
      console.log(res)
      const arr = res;
      if (arr.length === 0) {
        
      }
    });*/
  }

  async openProduct(item) {
    if (!this.catalogId) {
      this.onOpenProduct.emit(true);
      return;
    }
    if (this.isModal) {
      return;
    }
    this.isModal = true;
    const modal = await this.modalCtrl.create({
      component: ProductComponent,
      componentProps: {
        catalogId: this.catalogId,
        item,
      },
      cssClass: 'size-modal-contact',
    });
    modal.onDidDismiss().then((data) => {
      this.isModal = false;
      if (data) {
        this.getProducts();
      }
    });
    await modal.present();
  }

  remove(item) {
    const sub = this.catalogService.removeProducts(this.catalogId, item.id).subscribe(() => {
      sub.unsubscribe();
      this.getProducts();
    }, (err) => {
      sub.unsubscribe();
      console.error(err);
    })
  }

}
