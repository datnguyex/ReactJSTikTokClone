import classNames from 'classnames/bind';
import style from './UserInfo.module.scss';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';
import CommentVideo from '~/component/Comment/CommentVideo';
import UserComment from '~/component/Comment/UserComment';
import TypeComment from '~/component/Comment/TypeComment';
import TypeVideo from '~/component/Comment/TypeVideo';
import { HeartIcon, HeartSolidIcon, PlayIcon, IconACong, SmileFaceIcon } from '~/component/Icons';
import { CommentShare } from '~/component/Array';
import video from '~';
import { useState, memo } from 'react';
const cx = classNames.bind(style);
function UserInfo({
    handleLine,
    line,
    handleHeart,
    heart,
    handleSave,
    save,
    handleChangeType,
    changeType,
    handleHeartComment,
    heartComment,
    commentVideo,
    userValue,
    totalHear,
    hearValue,
    handleReloadComment,
}) {
    const [reload, setReload] = useState(true);
    const handleSetReload = () => {
        setReload(!reload);
    };
    console.log('reload', reload);
    return (
        <>
            <div className={cx('wrap-content__right')}>
                {
                    <UserComment
                        hearValue={hearValue}
                        userValue={userValue}
                        reload={reload}
                        changeType={changeType}
                        handleChangeType={handleChangeType}
                        save={save}
                        handleSave={handleSave}
                        heart={heart}
                        handleHeart={handleHeart}
                        line={line}
                        handleLine={handleLine}
                        commentVideo={commentVideo}
                        totalHear={totalHear}
                    />
                }
                <div className={cx('line-top')}></div>
                {/* /// */}
                {changeType == 'Comments' ? (
                    <>
                        <TypeComment
                            reload={reload}
                            handleSetReload={handleSetReload}
                            userValue={userValue}
                            commentVideo={commentVideo}
                            handleHeartComment={handleHeartComment}
                            heartComment={heartComment}
                            handleReloadComment={handleReloadComment}
                        />
                    </>
                ) : (
                    <>
                        <TypeVideo commentVideo={commentVideo} />
                    </>
                )}
            </div>
        </>
    );
}

export default memo(UserInfo);
