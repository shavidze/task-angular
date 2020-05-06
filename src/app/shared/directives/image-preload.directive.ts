import { Directive, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: 'img[src]',
    // tslint:disable-next-line: no-host-metadata-property
    host: {
        '[src]': 'checkPath(src)',
        '(error)': 'onError()',
    },
})
export class ImagePreloadDirective {
    defaultImg = '../../../assets/not-found.png';

    @Input() src: string;

    onError(): void {
        this.src = this.defaultImg;
    }
    checkPath(src: string): string {
        return src ? src : this.defaultImg;
    }
}
