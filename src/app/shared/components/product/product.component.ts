import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/core/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  form: FormGroup;
  @Input() item: any;
  @Input() catalogId: string;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit() {
    console.log(this.catalogId)
    this.form = this.formBuilder.group({
      id: [this.item?.id],
      name: [this.item?.name || null, Validators.compose([Validators.required])],
      description: [this.item?.description],
      catalogId: [this.catalogId],
      quality: [this.item?.quality || 0]
    });
  }

  dismiss(data = null) {
    this.modalCtrl.dismiss(data, data ? 'confirm' : 'cancel');
  }


  submit() {
    const sub = this.productService.updateOrCreate(this.catalogId, this.form.value).subscribe((res: any) => {
      this.dismiss(res);
      sub.unsubscribe();
    }, () => {
      sub.unsubscribe();
    });
  }
}
