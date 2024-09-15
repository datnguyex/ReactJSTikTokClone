import classNames from 'classnames/bind';
import style from './UploadItem.module.scss';
import { manage_items, watch_items } from '~/component/Array';
import { useRef, useState, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Menu from '~/component/Popper/Menu';
import UploadVideo from '~/pages/Upload/UploadVideo';
import UpLoadSetting from '~/pages/Upload/UpLoadSetting';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import images from '~/assets/images';

const cx = classNames.bind(style);
function UploadItem() {
    const [video, setVideo] = useState(null);
    const [showCopyCheck, setShowCopyCheck] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [infoVideo, setInfoVideo] = useState({
        duration: 0,
        size: 0,
        name: '',
    });
    const [valueWatch, setValueWatch] = useState('Only you');
    const handleGetVideo = (e) => {
        const file = e.target.files[0];

        if (file) {
            const videoElement = document.createElement('video');
            const url = URL.createObjectURL(file);
            videoElement.src = url;
            setVideo(url);

            videoElement.onloadedmetadata = () => {
                const durationInSeconds = Math.round(videoElement.duration);
                const minutes = Math.floor(durationInSeconds / 60);
                const seconds = durationInSeconds % 60;
                setInfoVideo((prevInfo) => ({
                    ...prevInfo,
                    duration: `${minutes}m ${seconds}s`,
                }));
                // URL.revokeObjectURL(url);
            };
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            setInfoVideo((prevInfo) => ({
                ...prevInfo,
                size: sizeInMB,
                name: file.name,
            }));
        } else {
            alert('khong tim thay video');
        }
    };
    const toggelStyle = {
        width: '38px',
        height: '22px',
    };
    const checkboxStyle = {
        width: '20px',
        height: '20px',
    };

    const handleValueWatch = (value) => {
        setValueWatch(value);
    };
    const handleShowCopyCheck = () => {
        setShowCopyCheck(!showCopyCheck);
    };
    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div className={cx('wrap-parent')}>
            {video == null ? (
                <UploadVideo handleGetVideo={handleGetVideo} />
            ) : (
                <UpLoadSetting
                    showCopyCheck={showCopyCheck}
                    showMore={showMore}
                    valueWatch={valueWatch}
                    watch_items={watch_items}
                    checkboxStyle={checkboxStyle}
                    toggelStyle={toggelStyle}
                    handleShowCopyCheck={handleShowCopyCheck}
                    handleShowMore={handleShowMore}
                    video={video}
                    infoVideo={infoVideo}
                    handleValueWatch={handleValueWatch}
                    manage_items={manage_items}
                />
            )}

            {/* adjust after success in upvideo */}
        </div>
    );
}

export default memo(UploadItem);
