// @flow

import FormElementState from './FormElementState';
import validate from 'validate.js';

type ErrorSet = { [string] : Array<string> };

export default class FormState {

    _onChange : OnChangeCallbackType
    _onFormValid : OnFormValidCallback
    _constraintSet : { [string] : Object }
    _elements : { [string] : FormElementState }

    constructor(onChange: OnChangeCallbackType, onFormValid: OnFormValidCallback, constraintSet: Object) {
        this._onChange = onChange;
        this._onFormValid = onFormValid;
        this._constraintSet = constraintSet;

        this._elements = {};
    }

    addElement(key : string, data : string | boolean = '', errors : Array<string> = []) {
        var constraintSetForField = typeof this._constraintSet[key] !== 'undefined' ? this._constraintSet[key] : null,
            onChangeCallback = this._onFieldChange.bind(this, key);

        this._elements[key] = new FormElementState(data, errors, onChangeCallback, constraintSetForField);
    }

    _onFieldChange(key : string) : void {
        this._onChange(this, key);
    }

    mapElements(callback : (string, FormElementState) => Array<any>) {
        return Object.keys(this._elements).map((key) => {
            var element : FormElementState = this._elements[key];

            return callback(key, element);
        });
    }

    forEachElement(callback : (string, FormElementState) => void) {
        Object.keys(this._elements).forEach((key : string) => {
            var element : FormElementState = this._elements[key];

            callback(key, element);
        });
    }

    getElementState(key : string) : FormElementState {
        if (typeof this._elements[key] === 'undefined') {
            throw new Error(`Could not find element with key: '${key}'`);
        }

        return this._elements[key];
    }

    _setErrors(errors : ErrorSet) {
        this.forEachElement((key, element) => {
            element.setErrors(
                typeof errors[key] !== 'undefined' ? errors[key] : []
            );
        });

        this._onChange(this);
    }

    hasErrors() : boolean {
        var count = 0;

        this.forEachElement((key, element) => {
            count += element.errors.length;
        });

        return count > 0;
    }

    isValid() : boolean {
        return !this.hasErrors();
    }

    submit() : void {
        this.validate()
            .then(() => {
                if (this.hasErrors()) {
                    return;
                }

                this._onFormValid(
                    this.getData()
                );
            });
    }

    validate() : Promise<void> {
        return validate.async(this.getData(), this._constraintSet)
            .then(
                () => {
                    this._setErrors({});
                },
                (errors : Error | ErrorSet ) => {
                    if (errors instanceof Error) {
                        throw errors;
                    }

                    this._setErrors(errors);
                }
            );
    }

    getData() : { [string]: string | boolean } {
        var out = {};

        this.forEachElement((key: string, element: FormElementState) => {
            out[key] = element.data
        });

        return out;
    }
}

export type OnChangeCallbackType = (newFormState: FormState, key : ?string) => void;
export type OnFormValidCallback = (data: Object) => void;
