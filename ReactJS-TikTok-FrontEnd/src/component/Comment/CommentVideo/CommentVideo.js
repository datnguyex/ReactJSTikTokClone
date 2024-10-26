import classNames from 'classnames/bind';
import style from './CommentVideo.module.scss';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';
import { XWordIcon, UnmuteIcon, MuteIcon, PhoneScreenIcon, ListIcon } from '~/component/Icons';
import { CommentShare } from '~/component/Array';
import video from '~';
import { useState } from 'react';
import { memo } from 'react';
const cx = classNames.bind(style);
function CommentVideo({ MENU_ITEMS, handleCommentVideo, handleMute, mute, commentVideo }) {
    return (
        <>
            <div className={cx('wrap-content__left')}>
                <video className={cx('video-background')} src={`http://127.0.0.1:8000/storage/${commentVideo.path}`} />
                <span onClick={() => handleCommentVideo(null)} className={cx('wrap-icon__close')}>
                    <XWordIcon fill={'#fff'} width={'2.5rem'} height={'2.5rem'} />
                </span>
                <span onClick={handleMute} className={cx('wrap-icon__voice')}>
                    {mute == false ? (
                        <UnmuteIcon fill={'#fff'} width={'2.5rem'} height={'2.5rem'} />
                    ) : (
                        <MuteIcon fill={'#fff'} width={'2.5rem'} height={'2.5rem'} />
                    )}
                </span>
                <span className={cx('wrap-icon__phoneScreen')}>
                    <PhoneScreenIcon fill={'#fff'} width={'2.5rem'} height={'2.5rem'} />
                </span>
                <Menu placement="bottom" items={MENU_ITEMS} start={300} end={300}>
                    <span className={cx('wrap-icon__list')}>
                        <ListIcon fill={'#fff'} width={'2.5rem'} height={'2.5rem'} />
                    </span>
                </Menu>
            </div>
            <div controls className={cx('wrap__left-video')}>
                <video muted={mute} controls src={`http://127.0.0.1:8000/storage/${commentVideo.path}`} />
            </div>
        </>
    );
}

export default memo(CommentVideo);
