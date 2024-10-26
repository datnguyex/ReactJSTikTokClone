import classNames from 'classnames/bind';
import style from './Comment.module.scss';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';
import CommentVideo from '~/component/Comment/CommentVideo';
import UserInfo from '~/component/Comment/UserInfo';
import { ArrowTopIcon, BrokenHeartIcon, FlagIcon } from '~/component/Icons';
import { CommentShare } from '~/component/Array';
import video from '~';
import { useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';
import { CommentItem } from '~/component/Array';
import { useCallback } from 'react';
const cx = classNames.bind(style);
function Comment({ commentVideo, handleCommentVideo, userValue }) {
    const [changeType, setChangeType] = useState('Comments');
    const [heart, setHeart] = useState(false);
    const [heartComment, setHeartComment] = useState([]);
    const [save, setSave] = useState(false);
    const [mute, setMute] = useState(false);
    const handleHeart = useCallback(() => {
        setHeart(!heart);
    }, []);
    const handleHeartComment = useCallback((value) => {
        setHeartComment((prevHeartComment) => {
            console.log('Previous State:', prevHeartComment);
            let newHeartComment;
            if (prevHeartComment.includes(value)) {
                newHeartComment = prevHeartComment.filter((item) => item !== value);
            } else {
                newHeartComment = [...prevHeartComment, value];
            }
            console.log('New State:', newHeartComment);
            return newHeartComment;
        });
    }, []);
    const handleSave = useCallback(() => {
        setSave(!save);
    }, []);
    const handleChangeType = useCallback((value) => {
        setChangeType(value);
    }, []);
    const [line, setLine] = useState(null);
    const handleLine = useCallback((value) => {
        setLine(value);
    }, []);
    const handleMute = useCallback(() => {
        setMute(!mute);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <CommentVideo
                MENU_ITEMS={CommentItem}
                mute={mute}
                handleCommentVideo={handleCommentVideo}
                handleMute={handleMute}
                commentVideo={commentVideo}
            />
            {/* // */}
            <UserInfo
                userValue={userValue}
                handleLine={handleLine}
                line={line}
                handleHeart={handleHeart}
                heart={heart}
                handleSave={handleSave}
                save={save}
                handleChangeType={handleChangeType}
                changeType={changeType}
                handleHeartComment={handleHeartComment}
                heartComment={heartComment}
                commentVideo={commentVideo}
            />
        </div>
    );
}

export default Comment;
