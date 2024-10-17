// DefaultLayout.jsx
import React from 'react';
import classNames from 'classnames/bind';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar/index';
import style from './DefaultLayout.module.scss';
import Button from '~/component/Button';
import { useEffect, useState } from 'react';
const cx = classNames.bind(style);

function DefaultLayout({ children, displayLogin, userValue, handleDisPlayLogOut, reaload, handleReloadSidebar }) {
    const scrollAmount = 900;

    return (
        <div id="zzz" className={cx('wrapper')}>
            <Button className={cx('btn-get')} small rounded>
                Get app
            </Button>
            <Header handleDisPlayLogOut={handleDisPlayLogOut} userValue={userValue} displayLogin={displayLogin} />
            <div className={cx('container')}>
                <Sidebar handleReloadSidebar={handleReloadSidebar} reaload={reaload} userValue={userValue} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
