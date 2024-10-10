import classNames from 'classnames/bind';
import style from './TypeComment.module.scss';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';
import CommentVideo from '~/component/Comment/CommentVideo';
import UserComment from '~/component/Comment/UserComment';
import { HeartIcon, HeartSolidIcon, PlayIcon, IconACong, SmileFaceIcon } from '~/component/Icons';
import { CommentShare } from '~/component/Array';
import video from '~';
import { useState } from 'react';
const cx = classNames.bind(style);
function TypeComment({ handleHeartComment, heartComment }) {
    return (
        <>
            <div className={cx('wrap-comment__member')}>
                <img
                    className={cx('img-comment__member')}
                    alt=""
                    src="https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?rs=1&pid=ImgDetMain"
                />
                <div>
                    <div className={cx('wrap-comment__info')}>
                        <p className={cx('comment__member-name')}>TCR7 ⚽</p>
                        <span onClick={() => handleHeartComment('1')} className={cx('comment__member-icon')}>
                            {heartComment.includes('1') ? (
                                <HeartSolidIcon width={'18px'} height={'18px'} />
                            ) : (
                                <HeartIcon width={'18px'} height={'18px'} />
                            )}
                        </span>
                    </div>
                    <p className={cx('comment__member-des')}>
                        nói thiệt Neymar đã chết khi qua psg một Neymar thật sự đã chết trước đồng tiền
                    </p>
                    <div className={cx('wrap-reply__comment')}>
                        <p className={cx('date-post__comemnt')}>8-20</p>
                        <p className={cx('date-post__reply')}>Reply</p>
                    </div>
                </div>
            </div>
            <div className={cx('wrap-comment__member')}>
                <img
                    className={cx('img-comment__member')}
                    alt=""
                    src="https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?rs=1&pid=ImgDetMain"
                />
                <div>
                    <div className={cx('wrap-comment__info')}>
                        <p className={cx('comment__member-name')}>TCR7 ⚽</p>
                        <span onClick={() => handleHeartComment('2')} className={cx('comment__member-icon')}>
                            {heartComment.includes('2') ? (
                                <HeartSolidIcon width={'18px'} height={'18px'} />
                            ) : (
                                <HeartIcon width={'18px'} height={'18px'} />
                            )}
                        </span>
                    </div>
                    <p className={cx('comment__member-des')}>
                        nói thiệt Neymar đã chết khi qua psg một Neymar thật sự đã chết trước đồng tiền
                    </p>
                    <div className={cx('wrap-reply__comment')}>
                        <p className={cx('date-post__comemnt')}>8-20</p>
                        <p className={cx('date-post__reply')}>Reply</p>
                    </div>
                </div>
            </div>
            <div className={cx('wrap-comment__member')}>
                <img
                    className={cx('img-comment__member')}
                    alt=""
                    src="https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?rs=1&pid=ImgDetMain"
                />
                <div>
                    <div className={cx('wrap-comment__info')}>
                        <p className={cx('comment__member-name')}>TCR7 ⚽</p>
                        <span onClick={() => handleHeartComment('3')} className={cx('comment__member-icon')}>
                            {heartComment.includes('3') ? (
                                <HeartSolidIcon width={'18px'} height={'18px'} />
                            ) : (
                                <HeartIcon width={'18px'} height={'18px'} />
                            )}
                        </span>
                    </div>
                    <p className={cx('comment__member-des')}>
                        nói thiệt Neymar đã chết khi qua psg một Neymar thật sự đã chết trước đồng tiền
                    </p>
                    <div className={cx('wrap-reply__comment')}>
                        <p className={cx('date-post__comemnt')}>8-20</p>
                        <p className={cx('date-post__reply')}>Reply</p>
                    </div>
                </div>
            </div>
            <div className={cx('wrap-comment__member')}>
                <img
                    className={cx('img-comment__member')}
                    alt=""
                    src="https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?rs=1&pid=ImgDetMain"
                />
                <div>
                    <div className={cx('wrap-comment__info')}>
                        <p className={cx('comment__member-name')}>TCR7 ⚽</p>
                        <span onClick={() => handleHeartComment('4')} className={cx('comment__member-icon')}>
                            {heartComment.includes('4') ? (
                                <HeartSolidIcon width={'18px'} height={'18px'} />
                            ) : (
                                <HeartIcon width={'18px'} height={'18px'} />
                            )}
                        </span>
                    </div>
                    <p className={cx('comment__member-des')}>
                        nói thiệt Neymar đã chết khi qua psg một Neymar thật sự đã chết trước đồng tiền
                    </p>
                    <div className={cx('wrap-reply__comment')}>
                        <p className={cx('date-post__comemnt')}>8-20</p>
                        <p className={cx('date-post__reply')}>Reply</p>
                    </div>
                </div>
            </div>
            <div className={cx('wrap-footer')}>
                <div className={cx('wrap-input__footer')}>
                    <input placeholder="Add comment" className={cx('input-fotter')} />
                    <div className={cx('wrap-icon__fotter')}>
                        <span className={cx('icon__fotter')}>
                            <IconACong width={'2.2rem'} height={'2.2rem'} />
                        </span>
                        <span className={cx('icon__fotter')}>
                            <SmileFaceIcon />
                        </span>
                    </div>
                </div>
                <button className={cx('btn-footer')}>Post</button>
            </div>
        </>
    );
}

export default TypeComment;
