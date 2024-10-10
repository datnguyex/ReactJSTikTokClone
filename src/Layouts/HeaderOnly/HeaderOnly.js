import classNames from 'classnames/bind';
import style from './HeaderOnly.module.scss';
import { PlayIcon, UserIcon } from '~/component/Icons';
import { useRef, useState } from 'react';
import Header from '~/Layouts/component/Header';
const cx = classNames.bind(style);

function HeaderOnly({ children, displayLogin, userValue }) {
    return (
        <div className={cx('wrapper')}>
            <Header userValue={userValue} displayLogin={displayLogin} />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
