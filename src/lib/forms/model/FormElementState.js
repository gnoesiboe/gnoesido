// @flow

import validate from 'validate.js';

type OnChangeCallbackType = () => void;

export default class FormElementState {

    _data : string | boolean
    _errors : Array<string>
    _onChange : OnChangeCallbackType
    _constraintSet : ?Object
    _touched : boolean

    constructor(data : string | boolean = '', errors : Array<string> = [], onChange : OnChangeCallbackType, constraintSet : ?Object = null) {
        this._data = data;
        this._errors = errors;
        this._onChange = onChange;
        this._constraintSet = constraintSet;

        this._touched = false;
    }

    applyChange(newData : string | boolean) : void {
        this._data = newData;

        this._onChange();
    }

    flagTouched() : void {
        this._touched = true;

        this._validate();
    }

    isTouched() : boolean {
        return this._touched;
    }

    get data() : string | boolean {
        return this._data;
    }

    /**
     * @private
     */
    _validate() {
        var input : Object = { input: this.data },
            constraintSet : Object = { input: this._constraintSet };

        validate.async(input, constraintSet)
            .then(
                () => {
                    this.setErrors([]);
                },
                (errors) => {
                    if (errors instanceof Error) {
                        throw errors;
                    }

                    this.setErrors(errors.input);
                }
            );
    }

    hasErrors() : boolean {
        return this._errors.length > 0;
    }

    setErrors(errors : Array<string>) {
        this._errors = errors;

        this._onChange();
    }

    get errors() : Array<string> {
        return this._errors;
    }
}
