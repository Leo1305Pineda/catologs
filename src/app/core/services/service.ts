import { HttpParams } from "@angular/common/http";

export class Service {
    protected getParams(arrayParams = []): HttpParams {
        let params = new HttpParams();
        const arr = Array.isArray(arrayParams) ? arrayParams : [];
        arr.forEach(param => {
          const split = param.split(',');
          if (split.length === 2) {
            params = params.append(split[0].trim(), split[1].trim());
          }
        });
        return params;
      }
}
