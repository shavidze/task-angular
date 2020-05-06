import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/core/models/client.model';
import { ClientService } from 'src/app/core/services/client.service';

@Injectable({ providedIn: 'root' })
export class ClientDetailsResolver implements Resolve<Client> {
  constructor(private clientService: ClientService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Client> {
    return this.clientService.getClientById(route.params.id);
  }
}
