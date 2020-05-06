import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/core/models/client.model';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {
  client: Client;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.client = this.activatedRoute.snapshot.data.data;
  }

  editClient(client: Client): void {
    this.clientService
      .editClient(client, this.client.id)
      .subscribe((res: Client) => {
        if (res) {
          this.router.navigate(['/clients']);
        }
      });
  }
}
