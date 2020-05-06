import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription, BehaviorSubject, Subject } from 'rxjs';
import { Client } from 'src/app/core/models/client.model';
import { TableHeader } from 'src/app/core/models/table-header.model';
import { ClientService } from 'src/app/core/services/client.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DynamicModel } from 'src/app/core/models/dynamic.model';
@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit, OnDestroy {
    cardTitle = ' ცნობარი';

    tableColumns: TableHeader[] = [
        {
            key: 'id',
            title: 'ID',
            filterKey: 'id',
        },
        {
            key: 'firstName',
            title: 'სახელი',
            filterKey: 'firstName_like',
        },
        {
            key: 'lastName',
            title: 'გვარი',
            filterKey: 'lastName_like',
        },
        {
            key: 'personalNumber',
            title: 'პირადი ნომერი',
            filterKey: 'personalNumber_like',
        },
    ];

    clients: Client[] = [];

    totalPages = 0;
    activePage = 1;
    limit = 3;
    private queryParams: any = {};
    private isLoading = false;

    filterSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    subscription: Subscription = new Subscription();

    constructor(
        private clientService: ClientService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.subscription.add(
            this.activatedRoute.queryParams.subscribe((params) => {
                this.queryParams = params;
                this.activePage = this.queryParams.page
                    ? this.queryParams.page
                    : 1;
                this.getClients();
            })
        );
        this.watchFilter();
    }

    getClients(): void {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;

        const getAllClient = this.clientService.getAllClient(this.queryParams);
        const getClientsByQuery = this.clientService.getClients(
            this.activePage,
            this.limit,
            this.queryParams
        );

        forkJoin([getAllClient, getClientsByQuery]).subscribe(
            (res) => {
                this.clients = [];
                this.totalPages = Math.ceil(res[0].length / this.limit);
                this.clients = [...res[1]];
                this.isLoading = false;
            },
            (err) => (this.isLoading = false)
        );
    }

    updateQueryParams(): void {
        this.router.navigate(['.'], {
            relativeTo: this.activatedRoute,
            queryParams: this.queryParams,
        });
    }

    pageChanged(page: number): void {
        this.queryParams = { ...this.queryParams, page };
        this.activePage = page;
        this.updateQueryParams();
        this.getClients();
    }

    deleteClient(id: number): void {
        this.clientService.deleteClient(id).subscribe(() => this.getClients());
    }

    orderBy(order: any): void {
        this.queryParams = Object.assign({}, this.queryParams, {
            _sort: order.key,
            _order: order.direction,
        });
        this.updateQueryParams();
    }

    filter(data: DynamicModel): void {
        this.filterSubject.next(data);
    }

    watchFilter(): void {
        this.subscription.add(
            this.filterSubject
                .pipe(debounceTime(500), distinctUntilChanged())
                .subscribe((data: DynamicModel) => {
                    this.queryParams = Object.assign(
                        {},
                        this.queryParams,
                        data
                    );
                    this.updateQueryParams();
                })
        );
    }

    search(q: string): void {
        this.queryParams = Object.assign({}, this.queryParams, { q });
        this.updateQueryParams();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
