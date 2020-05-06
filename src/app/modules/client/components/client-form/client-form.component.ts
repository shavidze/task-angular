import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/core/enums/gender.enum';
import { LanguageType } from 'src/app/core/enums/language.enum';
import { Client } from 'src/app/core/models/client.model';
import { SelectOptions } from 'src/app/core/models/select-options.model';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
    cardTitle = 'კლიენტის დამატება';
    clientForm: FormGroup;
    activeLang;

    genderOptions: SelectOptions[] = [
        { value: Gender.Male, title: 'კაცი' },
        { value: Gender.Female, title: 'ქალი' },
    ];

    @Input() data: Client;

    @Output() clientChanged: EventEmitter<Client> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        public validation: ValidationService
    ) {}

    ngOnInit() {
        this.clientForm = this.initForm();
        this.patchValue();
        this.toggleLanguage(LanguageType.GEO);
    }

    initForm(): FormGroup {
        return this.fb.group({
            firstName: '',
            lastName: '',
            gender: ['', Validators.required],
            personalNumber: [
                '',
                [
                    Validators.required,
                    Validators.minLength(11),
                    Validators.maxLength(11),
                    Validators.pattern(/^[0-9]*$/),
                ],
            ],
            mobile: [
                '',
                [
                    Validators.required,
                    Validators.minLength(9),
                    Validators.maxLength(9),
                    Validators.pattern(/(?=.*[0-9])^5/),
                ],
            ],
            legalAddress: this.createAddressForm(),
            actualAddress: this.createAddressForm(),
            image: '',
        });
    }

    createAddressForm(): FormGroup {
        return this.fb.group({
            country: ['', Validators.required],
            city: ['', Validators.required],
            address: ['', Validators.required],
        });
    }

    patchValue(): void {
        if (this.data) {
            this.clientForm.patchValue(this.data);
        }
    }

    getLanguageRegex(): RegExp {
        const georgianRegex = /^[\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u10FF\u2D00-\u2D25\u2D27\u2D2D _\\W]+$/;
        const englishRegex = /^[a-zA-Z _\\W]+$/;
        return this.activeLang === LanguageType.ENG
            ? englishRegex
            : georgianRegex;
    }

    toggleLanguage(language: string): void {
        this.activeLang =
            language === LanguageType.ENG ? LanguageType.GEO : LanguageType.ENG;
        this.generateLanguageValidations(['firstName', 'lastName']);
    }

    generateLanguageValidations(controls: string[]): void {
        controls.forEach(control => {
            this.clientForm.get(control).clearValidators();
            this.clientForm
                .get(control)
                .setValidators([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50),
                    Validators.pattern(this.getLanguageRegex()),
                ]);
            this.clientForm.get(control).updateValueAndValidity();
        });
    }

    validate(control: string): boolean {
        return (
            this.clientForm.controls[control].errors &&
            (this.clientForm.controls[control].touched ||
                this.clientForm.controls[control].dirty)
        );
    }

    validateSubControl(parentControl: string, childControl: string): boolean {
        return (
            (this.clientForm.get(parentControl) as FormArray).controls[
                childControl
            ].errors &&
            ((this.clientForm.get(parentControl) as FormArray).controls[
                childControl
            ].touched ||
                (this.clientForm.get(parentControl) as FormArray).controls[
                    childControl
                ].dirty)
        );
    }

    getValidationMessage(text: string, param: string | number): string {
        return this.validation.getValidationMessage(text, param);
    }

    onSubmit(): void {
        if (this.clientForm.valid) {
            this.clientChanged.emit(this.clientForm.value);
        }
    }
}
