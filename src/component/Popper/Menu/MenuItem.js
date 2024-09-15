import { json } from 'react-router-dom';
import Button from '~/component/Button';
import style from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
const cx = classNames.bind(style);
function MenuItem({ className, data, onClick, getValue = '' }) {
    // console.log('data', data);

    const classes = cx('menu-item', {
        separate: data.separate,
    });

    const classes2 = className;
    return (
        <Button
            onClick={getValue ? () => getValue(data.title) : onClick}
            className2={classes2}
            className={classes}
            leftIcon={data.icon}
            to={data.to}
            button={data.button}
        >
            {data.title}
        </Button>
    );
}
MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
