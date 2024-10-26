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
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { set } from 'date-fns';
const cx = classNames.bind(style);
function TypeComment({ userValue, commentVideo, handleHeartComment, heartComment }) {
    const [commentsUser, setCommentsUSer] = useState([]);
    const [describeComment, setDescribeComments] = useState('');
    // console.log('commentVideo', commentVideo);
    // console.log('commentsUser', commentsUser);
    const inputRef = useRef(null);
    const handleDescribeComment = (e) => {
        setDescribeComments(e.target.value);
    };
    console.log('describeComment', describeComment);
    const handleGetComments = async (event) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getCommentVideo', {
                params: {
                    video_id: commentVideo.id,
                },
            });
            console.log('comments get successfully:', response.data);
            setCommentsUSer(response.data.data);
            inputRef.current.value = '';
            inputRef.current.focus();
        } catch (error) {
            console.error('Error get comments:', error);
        }
    };
    const handleSubmitComment = async () => {
        if (!userValue) {
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/commentVideo', {
                video_id: commentVideo.id,
                comment_description: describeComment,
                user_id: userValue.id,
            });
            console.log('Comment submitted successfully:', response.data);
            handleGetComments();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    useEffect(() => {
        handleGetComments();
    }, []);

    return (
        <>
            {commentsUser.map((comment, index) => {
                const createdAt = new Date(comment.created_at);
                const formattedDate = `${createdAt.getDate()}/${createdAt.getMonth() + 1}`;
                return (
                    <div className={cx('wrap-comment__member')}>
                        <img
                            className={cx('img-comment__member')}
                            alt=""
                            src="https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?rs=1&pid=ImgDetMain"
                        />
                        <div>
                            <div className={cx('wrap-comment__info')}>
                                <p className={cx('comment__member-name')}>{comment.user.full_name}</p>
                                <span onClick={() => handleHeartComment('1')} className={cx('comment__member-icon')}>
                                    {heartComment.includes('1') ? (
                                        <HeartSolidIcon width={'18px'} height={'18px'} />
                                    ) : (
                                        <HeartIcon width={'18px'} height={'18px'} />
                                    )}
                                </span>
                            </div>
                            <p className={cx('comment__member-des')}>{comment.comment_description}</p>
                            <div className={cx('wrap-reply__comment')}>
                                <p className={cx('date-post__comemnt')}>{formattedDate}</p>
                                <p className={cx('date-post__reply')}>Reply</p>
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className={cx('wrap-footer')}>
                <div className={cx('wrap-input__footer')}>
                    <input
                        onChange={(e) => handleDescribeComment(e)}
                        placeholder="Add comment"
                        className={cx('input-fotter')}
                        ref={inputRef}
                    />
                    <div className={cx('wrap-icon__fotter')}>
                        <span className={cx('icon__fotter')}>
                            <IconACong width={'2.2rem'} height={'2.2rem'} />
                        </span>
                        <span className={cx('icon__fotter')}>
                            <SmileFaceIcon />
                        </span>
                    </div>
                </div>
                <button onClick={handleSubmitComment} className={cx('btn-footer')}>
                    Post
                </button>
            </div>
        </>
    );
}

export default TypeComment;
