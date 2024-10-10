import classNames from 'classnames/bind';
import style from './UpLoadSetting.module.scss';
import InfoSetting from '~/pages/Upload/InfoSetting';
import DescribeUpload from '~/pages/Upload/DescribeUpload';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'tippy.js/dist/tippy.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Menu from '~/component/Popper/Menu';
import { faFileVideo, faScissors, faVideo, faAngleDown, faHouse } from '@fortawesome/free-solid-svg-icons';
import { TickIcon } from '~/component/Icons';
import images from '~/assets/images';

const cx = classNames.bind(style);
const UploadSetting = ({
    handleShowCopyCheck,
    toggelStyle,
    valueWatch,
    watch_items,
    video,
    handleShowMore,
    infoVideo,
    manage_items,
    checkboxStyle,
    showMore,
    showCopyCheck,
    handleValueWatch,
    handleUpLoadVideo,
    handleDescription,
    description,
    userValue,
}) => {
    return (
        <>
            {/* info after success in upvideo */}
            <div className={cx('wrapGet__info-video')}>{/* /// */}</div>
            {<InfoSetting manage_items={manage_items} handleValueWatch={handleValueWatch} infoVideo={infoVideo} />}
            {
                <DescribeUpload
                    userValue={userValue}
                    handleDescription={handleDescription}
                    description={description}
                    handleUpLoadVideo={handleUpLoadVideo}
                    video={video}
                    handleValueWatch={handleValueWatch}
                    watch_items={watch_items}
                    valueWatch={valueWatch}
                    handleShowCopyCheck={handleShowCopyCheck}
                    toggelStyle={toggelStyle}
                    showCopyCheck={showCopyCheck}
                    handleShowMore={handleShowMore}
                    showMore={showMore}
                    checkboxStyle={checkboxStyle}
                />
            }
        </>
    );
};
export default UploadSetting;
