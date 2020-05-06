import { Injectable } from '@angular/core';

import { errorMessages } from '../utils/validation-messages';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    constructor() {}

    getValidationMessage(text: string, control: string | number): string {
        return errorMessages[text](control);
    }
}
