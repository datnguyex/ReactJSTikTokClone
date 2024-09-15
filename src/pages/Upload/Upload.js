import classNames from 'classnames/bind';
import style from './Upload.module.scss';
import Sidebar from '~/pages/Upload/Sidebar';
import UploadItem from '~/pages/upload/UploadItem';
import { PlayIcon, UserIcon } from '~/component/Icons';
import { useRef, useState } from 'react';
const cx = classNames.bind(style);
function Upload() {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <UploadItem />
        </div>
    );
}
export default Upload;
