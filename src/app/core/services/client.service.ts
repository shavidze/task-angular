import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Client } from './../models/client.model';
import { DynamicModel } from './../models/dynamic.model';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    constructor(private http: HttpClient) {}

    getAllClient(queryParams: any): Observable<Client[]> {
        const params = new HttpParams({
            fromObject: queryParams,
        });
        return this.http.get<Client[]>('clients', { params });
    }

    getClients(
        page: number,
        limit: number,
        queryParams: DynamicModel
    ): Observable<Client[]> {
        const params = new HttpParams({
            fromObject: queryParams,
        });
        return this.http.get<Client[]>(
            `clients?_page=${page}&_limit=${limit}`,
            { params }
        );
    }

    getClientById(id: number): Observable<Client> {
        return this.http.get<Client>(`clients/${id}`);
    }

    addClient(client: Client): Observable<Client> {
        return this.http.post<Client>('clients', client);
    }

    editClient(client: Client, id: number): Observable<Client> {
        return this.http.put<Client>(`clients/${id}`, client);
    }

    deleteClient(id: number): Observable<{}> {
        return this.http.delete(`clients/${id}`);
    }
}
