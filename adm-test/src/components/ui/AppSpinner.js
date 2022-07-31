import React from 'react';
import { Spinner } from 'reactstrap';
import '../../styles/AppSpinner.scss';


const AppSpinner = ({message}) => {
    return(
        <div className="fp-container">
            <Spinner size="sm" color="secondary" className="fp-spinner" style={{ width: '2rem', height: '2rem' }} />
            <span className="fp-spinner-label">{message ? message : 'Loading...'}</span>
        </div>
    )
}

export default AppSpinner;
