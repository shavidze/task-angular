import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/core/models/client.model';

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent implements OnInit {
    client: Client;
    cardTitle = 'კლიენტის მონაცემები დეტალურად';
    clientsTitle = 'კლიენტის ანგარიშები';

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.client = this.activatedRoute.snapshot.data.data;
        if (!this.client) {
            this.router.navigate(['/clients']);
        }
    }
}
