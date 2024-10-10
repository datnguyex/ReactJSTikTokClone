import classNames from 'classnames/bind';
import style from './TypeVideo.module.scss';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';
import { HeartIcon, HeartSolidIcon, PlayIcon, IconACong, SmileFaceIcon } from '~/component/Icons';
import video from '~';
import { useState } from 'react';
const cx = classNames.bind(style);
function TypeVideo({ commentVideo }) {
    return (
        <>
            <div className={cx('wrap-video__user')}>
                <div className={cx('wrap-user__video')}>
                    <video src={commentVideo} />
                    <div className={cx('wrap-view')}>
                        <span className={cx('icon-video')}>
                            <PlayIcon />
                        </span>
                        <strong className={cx('view-video')}>1.3M</strong>
                    </div>
                </div>
                <div className={cx('wrap-user__video')}>
                    <video src={commentVideo} />
                    <div className={cx('wrap-view')}>
                        <span className={cx('icon-video')}>
                            <PlayIcon />
                        </span>
                        <strong className={cx('view-video')}>1.3M</strong>
                    </div>
                </div>
                <div className={cx('wrap-user__video')}>
                    <video src={commentVideo} />
                    <div className={cx('wrap-view')}>
                        <span className={cx('icon-video')}>
                            <PlayIcon />
                        </span>
                        <strong className={cx('view-video')}>1.3M</strong>
                    </div>
                </div>
                <div className={cx('wrap-user__video')}>
                    <video src={commentVideo} />
                    <div className={cx('wrap-view')}>
                        <span className={cx('icon-video')}>
                            <PlayIcon />
                        </span>
                        <strong className={cx('view-video')}>1.3M</strong>
                    </div>
                </div>
                <div className={cx('wrap-user__video')}>
                    <video src={commentVideo} />
                    <div className={cx('wrap-view')}>
                        <span className={cx('icon-video')}>
                            <PlayIcon />
                        </span>
                        <strong className={cx('view-video')}>1.3M</strong>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TypeVideo;
