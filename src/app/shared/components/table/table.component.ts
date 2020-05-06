import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faArrowDown, faArrowUp, faEdit, faInfo, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Client } from 'src/app/core/models/client.model';
import { DynamicModel } from 'src/app/core/models/dynamic.model';
import { TableHeader } from 'src/app/core/models/table-header.model';

type directionType = 'asc' | 'desc';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent {
    faEdit = faEdit;
    faInfo = faInfo;
    faTrash = faTrash;
    faArrowUp = faArrowUp;
    faArrowdown = faArrowDown;

    activeColumn: string;
    activeDirection: string;
    keywords: any[] = [];
    searchForm = new FormGroup({
        query: new FormControl('', Validators.required),
    });

    @Input() columns: TableHeader[] = [];

    @Input() data: Client[] = [];

    @Output() remove: EventEmitter<number> = new EventEmitter();

    @Output() orderBy: EventEmitter<object> = new EventEmitter();

    @Output() filter: EventEmitter<DynamicModel> = new EventEmitter();

    @Output() search: EventEmitter<string> = new EventEmitter();

    constructor() {}

    delete(id: number): void {
        this.remove.emit(id);
    }

    sort(key: string, direction: directionType): void {
        this.activeColumn = key;
        this.activeDirection = direction;
        this.orderBy.emit({ key, direction });
    }

    isOrder(key: string, direction: directionType): boolean {
        return this.activeColumn === key && this.activeDirection === direction;
    }

    modelChanged(key: string, value: string): void {
        this.filter.emit({
            [key]: value || null,
        });
    }

    onSubmit(): void {
        this.search.emit(this.searchForm.value.query);
    }
}
