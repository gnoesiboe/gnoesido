// @flow

import React from 'react';

type Props = {
    error: string
}

function FormError(props: Props) : React$Element<any> {
    return (
        <span className="help-block">
            { props.error }
        </span>
    );
}

export default FormError;
