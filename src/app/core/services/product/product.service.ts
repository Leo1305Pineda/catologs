import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Service } from '../service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends Service {

  /** @host environment.apiHost */
  protected url: string;
  
  constructor(
    private http: HttpClient
  ) { 
    super();
    this.url = `${environment.endpoint}/api/v1/catalogs`;
  }

  getAll(): Observable<any> {
    return this.http.get(this.url);
  }

  getAllParams(arrayParams: any []): Observable<any> {
    let params = this.getParams(arrayParams);
    return this.http.get(this.url, {params});
  }

  updateOrCreate(catalogId, body): Observable<any> {
    return !!body.id ? this.http.put(`${this.url}/${catalogId}/products/${body.id}`, body) : this.http.post(`${this.url}/${catalogId}/products`, body);
  }
}
