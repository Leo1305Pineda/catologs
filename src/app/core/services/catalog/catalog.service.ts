import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService extends Service {

  
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
 
  getProducts(catalogId, arrayParams: any []): Observable<any> {
    let params = this.getParams(arrayParams);
    return this.http.get(`${this.url}/${catalogId}/products`, {params});
  }

  removeProducts(catalogId, productoId): Observable<any> {
    return this.http.delete(`${this.url}/${catalogId}/products/${productoId}`);
  }

  updateOrCreate(body): Observable<any> {
    return !!body.id ? this.http.put(`${this.url}/${body.id}`, body) : this.http.post(this.url, body);
  }

}
