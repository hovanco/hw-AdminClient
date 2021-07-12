import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-large.svg';
import logo2 from '../../assets/images/logo-small.svg';
import constants from '../../constants';
import './style.less';

interface Props {
    dark?: boolean;
    size?: number;
    collapsed?: boolean;
}

const Logo: FC<Props> = ({ size = 100, dark = false, collapsed = false }) => {
    const src = collapsed ? logo2 : logo;

    return (
        <Link to='/dashboard/overview' className='logo'>
            <img src={src} alt={constants.title} style={{ width: size }} />
        </Link>
    );
};

export default Logo;
