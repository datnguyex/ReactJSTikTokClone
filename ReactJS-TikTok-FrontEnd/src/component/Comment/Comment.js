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
import axios from 'axios';
import video from '~';
import { useEffect, useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';
import { CommentItem } from '~/component/Array';
import { useCallback } from 'react';
const cx = classNames.bind(style);
function Comment({ commentVideo, handleCommentVideo, userValue, handleReloadComment }) {
    const [changeType, setChangeType] = useState('Comments');
    const [heart, setHeart] = useState(false);
    const [hearValue, setHearValue] = useState(false);
    const [heartComment, setHeartComment] = useState([]);
    const [save, setSave] = useState(false);
    const [mute, setMute] = useState(false);
    const [totalHear, setTotalHear] = useState(0);
    const handleHeart = (item) => {
        setHearValue(item);
        handleSetHeart();

        // console.log('hearValue', hearValue);
    };
    console.log('hearValue', hearValue);
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
    const handleCheckLikeVideo = async () => {
        if (!userValue) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/checkLikeVideo', {
                user_id: userValue.id,
                video_id: commentVideo.id,
            });

            console.log('Responsezz:', response.data.liked);
            setHearValue(response.data.liked);
        } catch (error) {
            console.error('Error fetching like status:', error.response ? error.response.data : error.message);
        }
    };
    const getAllHeartVideo = () => {
        axios
            .get('http://localhost:8000/api/getTotalLikeVideo', {
                params: {
                    video_id: commentVideo.id,
                },
            })
            .then((response) => {
                setTotalHear(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            });
    };
    const handleSetHeart = async () => {
        if (!userValue) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/likeVideo', {
                user_id: userValue.id,
                video_id: commentVideo.id,
            });

            console.log('Response:', response.data);
            setHeart(!heart);
            getAllHeartVideo();
            handleReloadComment();
        } catch (error) {
            console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        }
    };
    const handleSave = useCallback(() => {
        hearValue(!save);
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
    useEffect(() => {
        handleCheckLikeVideo();
        getAllHeartVideo();
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
                hearValue={hearValue}
                totalHear={totalHear}
                handleReloadComment={handleReloadComment}
            />
        </div>
    );
}

export default Comment;
