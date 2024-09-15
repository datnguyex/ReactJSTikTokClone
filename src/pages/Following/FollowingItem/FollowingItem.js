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
import { useState, useCallback } from 'react';
const cx = classNames.bind(style);
function FollowingItem() {
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
                <FollowingVideo />
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
                    <FollowingTool icon={<CommentIcon />} text={'390.8K'} />
                    <FollowingTool
                        onClick={handleSetHeart}
                        icon={heart == true ? <HeartSolidIcon /> : <HeartIcon />}
                        text={'1122'}
                        className={cx(heart == true ? 'show' : 'hide')}
                    />
                    <FollowingTool icon={<CheckIcon />} avatar={true} />
                </div>
            </div>
        </div>
    );
}
export default FollowingItem;
