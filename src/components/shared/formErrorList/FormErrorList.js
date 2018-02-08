// @flow

import React from 'react';
import FormError from './components/FormError';

type Props = {
    errors: Array<string>
}

function FormErrorList(props: Props) : Array<React$Element<any>> {
    return props.errors.map((error, index) => (
        <FormError
            key={ index }
            error={ error }
        />
    ));
}

export default FormErrorList;
