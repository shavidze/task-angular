import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/models/client.model';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent {
  constructor(private router: Router, private clientService: ClientService) {}

  addClient(client: Client): void {
    this.clientService.addClient(client).subscribe((res: Client) => {
      if (res) {
        this.router.navigate(['/clients']);
      }
    });
  }
}
