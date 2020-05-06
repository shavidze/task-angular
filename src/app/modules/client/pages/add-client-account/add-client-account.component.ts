import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SelectOptions } from 'src/app/core/models/select-options.model';
import { AccountType } from 'src/app/core/enums/account-type.enum';
import { AccountStatus } from 'src/app/core/enums/account-status.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/core/models/client.model';
import { Account } from 'src/app/core/models/account.model';
import { AccountService } from 'src/app/core/services/account.service';
import { CheckboxOptions } from 'src/app/core/models/checkbox-options.model';

@Component({
    selector: 'app-add-client-account',
    templateUrl: './add-client-account.component.html',
    styleUrls: ['./add-client-account.component.scss'],
})
export class AddClientAccountComponent implements OnInit {
    cardTitle = 'კლიენტის ანგარიშის დამატება';
    client: Client;
    accountForm: FormGroup;

    typeOptions: SelectOptions[] = [
        { value: AccountType.Current, title: 'მიმდინარე' },
        { value: AccountType.Deposit, title: 'შემნახველი' },
        { value: AccountType.Accumulative, title: 'დაგროვებითი' },
    ];

    statusOptions: SelectOptions[] = [
        { value: AccountStatus.Active, title: 'აქტიური' },
        { value: AccountStatus.Inactive, title: 'დახურული' },
    ];

    currencies: CheckboxOptions[] = [
        { value: 'gel', selected: false },
        { value: 'usd', selected: false },
        { value: 'eur', selected: false },
        { value: 'rub', selected: false },
    ];

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.client = this.activatedRoute.snapshot.data.data;
        if (!this.client) {
            this.router.navigate(['/clients']);
        }
        this.accountForm = this.initForm(this.client.id);
    }

    initForm(id: number): FormGroup {
        return this.fb.group({
            clientNumber: [id, Validators.required],
            currencies: this.fb.array(
                [...this.currencies.map(x => x.selected)],
                Validators.required
            ),
            accountType: ['', Validators.required],
            accountStatus: ['', Validators.required],
        });
    }

    onSubmit(): void {
        const account: Account = Object.assign({}, this.accountForm.value, {
            currencies: this.accountForm.value.currencies.map(
                (value, index) => {
                    return {
                        currency: this.currencies[index].value,
                        selected: value,
                    };
                }
            ),
        });
        this.accountService
            .createAccount(this.client.id, account)
            .subscribe((res: Account) => {
                if (res) {
                    this.router.navigate(['/clients/details', this.client.id]);
                }
            });
    }
}
