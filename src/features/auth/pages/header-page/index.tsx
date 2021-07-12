import React from 'react';
import { Link } from 'react-router-dom';
import AdminLogo from '../../../../assets/images/insa-admin.svg';

const HeaderPage = () => {
    return (
        <div className="header-page">
            <Link to="/">
                <img src={AdminLogo} alt="" className="header-page-logo" />
            </Link>
        </div>
    );
};

export default HeaderPage;
