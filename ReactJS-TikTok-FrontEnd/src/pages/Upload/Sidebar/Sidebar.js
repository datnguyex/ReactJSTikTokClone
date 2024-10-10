import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import { useRef, useState } from 'react';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { SideBarUpLoadList } from '~/component/Array';
const cx = classNames.bind(style);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('btn-upload')}>Upload</div>
                <div className={cx('space-top')}></div>
                <hr className={cx('line-top')}></hr>
                {SideBarUpLoadList.map((item, index) => (
                    <div key={index} className={cx('content-item')}>
                        <div className={cx('content-Wrapitem__icon')}>
                            <span className={cx('content-item__icon')}>{<item.icon />}</span>
                        </div>
                        <p className={cx('content-item__text')}>{item.title}</p>
                    </div>
                ))}
                <a className={cx('title-back')}>Back to TikTok</a>
                <hr className={cx('line-bottom')}></hr>
                <div className={cx('wrap__text-bottom')}>
                    <a className={cx('text-bottom')}>Terms of Service</a>
                    <a className={cx('text-bottom')}>Privacy Policy</a>
                    <a className={cx('text-bottom')}>Copyright © 2024 TikTok</a>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
