import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    constructor(private http: HttpClient) {}

    getAccounts(id: number): Observable<Account[]> {
        return this.http.get<Account[]>(`accounts?clientNumber=${id}`);
    }

    createAccount(id: number, value: Account): Observable<Account> {
        return this.http.post<Account>(`accounts?clientNumber=${id}`, value);
    }

    editAccount(id: number, value: Account): Observable<Account> {
        return this.http.put<Account>(`accounts/${id}`, value);
    }
}
