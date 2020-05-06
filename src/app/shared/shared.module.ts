import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CardComponent } from './components/card/card.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';
import { ImagePreloadDirective } from './directives/image-preload.directive';

const SHARED_MODULES: any[] = [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    FontAwesomeModule,
];

const SHARED_COMPONENTS: any[] = [
    TableComponent,
    PaginationComponent,
    CardComponent,
];

const SHARED_DIRECTIVES: any[] = [ImagePreloadDirective];

@NgModule({
    imports: [...SHARED_MODULES],
    exports: [...SHARED_MODULES, ...SHARED_COMPONENTS, ...SHARED_DIRECTIVES],
    declarations: [...SHARED_COMPONENTS, ...SHARED_DIRECTIVES],
    entryComponents: [],
})
export class SharedModule {}
