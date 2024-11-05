import classNames from 'classnames/bind';
import FollowingVideo from '~/pages/Following/FollowingVideo/';
import FollowingTool from '~/pages/Following/FollowingTool';
import style from './FollowingItem.module.scss';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import { FollowingItems } from '~/component/Array';
import {
    HeartIcon,
    HeartSolidIcon,
    CommentIcon,
    SaveIcon,
    SaveSolidIcon,
    CheckIcon,
    ShareIcon,
} from '~/component/Icons';
// import Tippy from '@tippyjs/react/headless';

import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
const cx = classNames.bind(style);
function FollowingItem({ usersFollowing, handleCommentVideo, userValue, reLoadComment }) {
    const [totalComments, setTotalComments] = useState(0);
    const [save, setSave] = useState(false);
    const [heart, setHeart] = useState(false);
    const [totalHear, setTotalHear] = useState(0);

    const FetchDataComment = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/getTotalCommentVideo', {
                params: {
                    videoID: usersFollowing.id,
                },
            });
            console.log('comments', response.data);
            setTotalComments(response.data.data);
        } catch (error) {
            console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        }
    };
    const getAllHeartVideo = () => {
        axios
            .get('http://localhost:8000/api/getTotalLikeVideo', {
                params: {
                    video_id: usersFollowing.id,
                },
            })
            .then((response) => {
                setTotalHear(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            });
    };
    const handleCheckLikeVideo = async () => {
        if (!userValue) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/checkLikeVideo', {
                user_id: userValue.id,
                video_id: usersFollowing.id,
            });

            console.log('Response:', response.data);
            setHeart(response.data.liked);
        } catch (error) {
            console.error('Error fetching like status:', error.response ? error.response.data : error.message);
        }
    };

    const handleSetSave = useCallback(() => {
        setSave(!save);
    }, []);
    const handleSetHeart = async () => {
        if (!userValue) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/likeVideo', {
                user_id: userValue.id,
                video_id: usersFollowing.id,
            });

            console.log('Response:', response.data);
            setHeart(!heart);
            getAllHeartVideo();
        } catch (error) {
            console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        }
    };
    useEffect(() => {
        handleCheckLikeVideo();
        getAllHeartVideo();
        FetchDataComment();
    }, [reLoadComment]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <FollowingVideo usersFollowing={usersFollowing} />
                <div className={cx('tool')}>
                    <Menu seeMore={true} placement={'top-start'} className={'wrap-menuShare'} items={FollowingItems}>
                        <FollowingTool icon={<ShareIcon />} text={'1.4K'} />
                    </Menu>
                    <FollowingTool
                        onClick={handleSetSave}
                        icon={save == true ? <SaveSolidIcon /> : <SaveIcon />}
                        text={'24.2K'}
                        className={cx(save == true ? 'show' : 'hide')}
                    />
                    <FollowingTool
                        usersFollowing={usersFollowing}
                        handleCommentVideo={handleCommentVideo}
                        icon={<CommentIcon />}
                        text={totalComments}
                    />
                    <FollowingTool
                        onClick={handleSetHeart}
                        icon={heart == true ? <HeartSolidIcon /> : <HeartIcon />}
                        text={totalHear}
                        className={cx(heart == true ? 'show' : 'hide')}
                    />
                    <FollowingTool usersFollowing={usersFollowing} icon={<CheckIcon />} avatar={true} />
                </div>
            </div>
        </div>
    );
}
export default FollowingItem;
