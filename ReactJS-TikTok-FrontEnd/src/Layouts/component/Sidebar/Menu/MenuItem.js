import classNames from 'classnames/bind';
import style from './Menu.module.scss';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
const cx = classNames.bind(style);
function MenuItem({ title, to, icon, activeIcon }) {
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

MenuItem.propTypes = {
    // children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node.isRequired,
};

export default memo(MenuItem);
