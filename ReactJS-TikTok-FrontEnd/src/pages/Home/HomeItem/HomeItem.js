import classNames from 'classnames/bind';
import HomeVideo from '~/pages/Home/HomeVideo/';
import HomeTool from '~/pages/Home/HomeTool';
import style from './HomeItem.module.scss';
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
import { useCallback, useState } from 'react';
const cx = classNames.bind(style);
function HomeItem({ handleCommentVideo }) {
    const [save, setSave] = useState(false);
    const [heart, setHeart] = useState(false);

    const handleSetSave = useCallback(() => {
        setSave(!save);
    }, []);
    const handleSetHeart = useCallback(() => {
        setHeart(!heart);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <HomeVideo />
                <div className={cx('tool')}>
                    <Menu seeMore={true} placement={'top-start'} className={'wrap-menuShare'} items={FollowingItems}>
                        <HomeTool icon={<ShareIcon />} text={'1.4K'} />
                    </Menu>
                    <HomeTool
                        onClick={handleSetSave}
                        icon={save == true ? <SaveSolidIcon /> : <SaveIcon />}
                        text={'24.2K'}
                        className={cx(save == true ? 'show' : 'hide')}
                    />
                    <HomeTool handleCommentVideo={handleCommentVideo} icon={<CommentIcon />} text={'390.8K'} />
                    <HomeTool
                        onClick={handleSetHeart}
                        icon={heart == true ? <HeartSolidIcon /> : <HeartIcon />}
                        text={'1122'}
                        className={cx(heart == true ? 'show' : 'hide')}
                    />
                    <HomeTool icon={<CheckIcon />} avatar={true} />
                </div>
            </div>
        </div>
    );
}
export default HomeItem;
