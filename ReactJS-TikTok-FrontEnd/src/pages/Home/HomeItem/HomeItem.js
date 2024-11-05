import classNames from 'classnames/bind';
import HomeVideo from '~/pages/Home/HomeVideo/';
import HomeTool from '~/pages/Home/HomeTool';
import style from './HomeItem.module.scss';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import { FollowingItems } from '~/component/Array';
import axios from 'axios';
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
import { useCallback, useEffect, useState } from 'react';
const cx = classNames.bind(style);
function HomeItem({ handleDisplayLogin, userValue, handleCommentVideo, usersSuggested, reLoadComment }) {
    const [save, setSave] = useState(false);
    const [heart, setHeart] = useState(false);
    const [totalHear, setTotalHear] = useState(0);
    const [totalComments, setTotalComments] = useState(0);

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
                video_id: usersSuggested.id,
            });

            console.log('Response:', response.data);
            setHeart(!heart);
            getAllHeartVideo();
        } catch (error) {
            console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        }
    };
    const FetchDataComment = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/getTotalCommentVideo', {
                params: {
                    videoID: usersSuggested.id,
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
                    video_id: usersSuggested.id,
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
                video_id: usersSuggested.id,
            });

            console.log('Response:', response.data);

            // Update heart state based on the boolean value
            setHeart(response.data.liked);
        } catch (error) {
            console.error('Error fetching like status:', error.response ? error.response.data : error.message);
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
                <HomeVideo usersSuggested={usersSuggested} />
                <div className={cx('tool')}>
                    <Menu seeMore={true} placement={'top-start'} className={'wrap-menuShare'} items={FollowingItems}>
                        <HomeTool
                            handleDisplayLogin={handleDisplayLogin}
                            userValue={userValue}
                            icon={<ShareIcon />}
                            text={'1.4K'}
                        />
                    </Menu>
                    <HomeTool
                        handleDisplayLogin={handleDisplayLogin}
                        userValue={userValue}
                        onClick={handleSetSave}
                        icon={save == true ? <SaveSolidIcon /> : <SaveIcon />}
                        text={'24.2K'}
                        className={cx(save == true ? 'show' : 'hide')}
                    />
                    <HomeTool
                        handleDisplayLogin={handleDisplayLogin}
                        userValue={userValue}
                        usersSuggested={usersSuggested}
                        handleCommentVideo={handleCommentVideo}
                        icon={<CommentIcon />}
                        text={totalComments}
                    />
                    <HomeTool
                        userValue={userValue}
                        handleDisplayLogin={handleDisplayLogin}
                        onClick={handleSetHeart}
                        icon={heart == true ? <HeartSolidIcon /> : <HeartIcon />}
                        text={totalHear}
                        className={cx(heart == true ? 'show' : 'hide')}
                    />
                    <HomeTool
                        handleDisplayLogin={handleDisplayLogin}
                        usersSuggested={usersSuggested}
                        icon={<CheckIcon />}
                        avatar={true}
                    />
                </div>
            </div>
        </div>
    );
}
export default HomeItem;
