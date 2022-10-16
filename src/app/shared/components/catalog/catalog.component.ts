import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { CatalogService } from 'src/app/core/services';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {

  form: FormGroup;
  @Input() item: any;

  constructor(
    private catalogService: CatalogService,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.item?.id],
      name: [this.item?.name || null, Validators.compose([Validators.required])],
    });
  }

  submit(isDeismiss = true) {
    const sub = this.catalogService.updateOrCreate(this.form.value).subscribe((res: any) => {
      if (isDeismiss) {
        this.dismiss(res);
      } else {
        console.log(res, 'UMMMM')
       // this.item = res; 
       //  this.form.patchValue(this.item);
      }
      sub.unsubscribe();
    }, () => {
      sub.unsubscribe();
    });
  }

  onOpenProduct(event) {
    if (event) {
      this.submit(false);
    }
  }

  dismiss(data = null) {
    this.modalCtrl.dismiss(data, data ? 'confirm' : 'cancel');
  }

}
