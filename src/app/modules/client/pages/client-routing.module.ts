import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsResolver } from 'src/app/core/resolvers/client-details.resolver';

import { AddClientAccountComponent } from './add-client-account/add-client-account.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientComponent } from './client/client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
    },
    {
        path: 'add',
        component: AddClientComponent,
    },
    {
        path: 'edit/:id',
        component: EditClientComponent,
        resolve: {
            data: ClientDetailsResolver,
        },
    },
    {
        path: 'details/:id',
        component: ClientDetailsComponent,
        resolve: {
            data: ClientDetailsResolver,
        },
    },
    {
        path: 'details/:id/account/add',
        component: AddClientAccountComponent,
        resolve: {
            data: ClientDetailsResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoutingModule {}
