import classNames from 'classnames/bind';
import style from './Menu.module.scss';
import MenuItem from './MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
const cx = classNames.bind(style);
function Header({ className, title, icon, onBack }) {
    return (
        <header className={cx('header', className)}>
            <button className={cx('back-btn')} onClick={onBack}>
                {icon}
            </button>
            <h4 onClick={onBack} className={cx('header-title')}>
                {title}
            </h4>
        </header>
    );
}
Header.propTypes = {
    title: PropTypes.node.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default Header;
