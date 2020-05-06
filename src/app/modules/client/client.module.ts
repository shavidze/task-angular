import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ClientFormComponent } from './components/client-form/client-form.component';
import { AddClientAccountComponent } from './pages/add-client-account/add-client-account.component';
import { AddClientComponent } from './pages/add-client/add-client.component';
import { ClientDetailsComponent } from './pages/client-details/client-details.component';
import { ClientRoutingModule } from './pages/client-routing.module';
import { ClientComponent } from './pages/client/client.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { ClientAccountsComponent } from './components/client-accounts/client-accounts.component';

@NgModule({
    declarations: [
        ClientComponent,
        ClientFormComponent,
        AddClientComponent,
        EditClientComponent,
        ClientDetailsComponent,
        AddClientAccountComponent,
        ClientAccountsComponent,
    ],
    imports: [ClientRoutingModule, SharedModule],
})
export class ClientModule {}
