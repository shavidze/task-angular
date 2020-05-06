import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
    pages: number[] = [];

    @Input() set totalPages(value) {
        this.generatePages(value);
    }
    @Input() activePage = 0;

    @Output() pageChanged: EventEmitter<number> = new EventEmitter();

    constructor() {}

    generatePages(value: number): void {
        this.pages = [];
        for (let i = 1; i <= value; i++) {
            this.pages.push(i);
        }
    }

    onPageChange(page: number): void {
        this.pageChanged.emit(page);
    }
}
