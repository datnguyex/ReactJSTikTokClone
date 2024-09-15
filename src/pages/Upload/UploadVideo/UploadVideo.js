import classNames from 'classnames/bind';
import style from './UploadVideo.module.scss';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo, faScissors, faVideo } from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UploadIcon } from '~/component/Icons';
const cx = classNames.bind(style);
function UploadVideo({ handleGetVideo }) {
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('content__upload-Video')}>
                    <div className={cx('content__upload-icon')}>
                        <UploadIcon width={'7.2rem'} height={'7.2rem'} />
                    </div>
                    <p className={cx('content__upload-text')}>Select video to upload</p>
                    <p className={cx('content__upload-instruction')}>Or drag and drop it here</p>
                    <button className={cx('content__upload-btn')}>Select Video</button>
                    <input
                        onChange={handleGetVideo}
                        type="file"
                        accept="video/*"
                        className={cx('content__up-Video')}
                    ></input>
                </div>
                <div className={cx('wrap-introduce')}>
                    <div className={cx('introduce-item')}>
                        <span>
                            <FontAwesomeIcon icon={faVideo} className={cx('item-icon')} />
                        </span>
                        <div className={cx('item-wrap__text')}>
                            <p className={cx('item-text1')}>Size and duration</p>
                            <p className={cx('item-text2')}>Maximum size: 10 GB, video duration: 60 minutes.</p>
                        </div>
                    </div>
                    <div className={cx('introduce-item')}>
                        <span>
                            <FontAwesomeIcon icon={faFileVideo} className={cx('item-icon')} />
                        </span>
                        <div className={cx('item-wrap__text')}>
                            <p className={cx('item-text1')}>File formats</p>
                            <p className={cx('item-text2')}>Recommended: “.mp4”. Other major formats are supported.</p>
                        </div>
                    </div>
                    <div className={cx('introduce-item')}>
                        <span>
                            <UploadIcon width={'3.1rem'} height={'3.1rem'} />
                        </span>
                        <div className={cx('item-wrap__text')}>
                            <p className={cx('item-text1')}>Video resolutions</p>
                            <p className={cx('item-text2')}>Maximum size: 10 GB, video duration: 60 minutes.</p>
                        </div>
                    </div>
                    <div className={cx('introduce-item')}>
                        <span>
                            <FontAwesomeIcon className={cx('item-icon')} icon={faScissors} />
                        </span>
                        <div className={cx('item-wrap__text')}>
                            <p className={cx('item-text1')}>Size and duration</p>
                            <p className={cx('item-text2')}>Maximum size: 10 GB, video duration: 60 minutes.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('wrapper-bottom')}>
                <div className={cx('capcut__wrap-text')}>
                    <p className={cx('capcut-text1')}>Create high quality videos on CapCut Online</p>
                    <p className={cx('capcut-text2')}>
                        Automatically shorten your videos and create videos from scripts with AI-powered features.
                    </p>
                </div>
                <div className={cx('wrap__capcut-btn')}>
                    <button className={cx('wrap__capcut-btn')}>Try Now</button>
                </div>
            </div>
        </>
    );
}

export default UploadVideo;
