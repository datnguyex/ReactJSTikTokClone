import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Image } from '~/component/Image';
import Button from '~/component/Button';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image
                    className={cx('avatar')}
                    loading="lazy"
                    alt=""
                    src="https://th.bing.com/th/id/OIP.aQ2-HK9gCw256kym3o0qRgHaHF?rs=1&pid=ImgDetMain"
                />
                <Button primary className={cx('follow-btn')}>
                    Following
                </Button>
            </div>
            <div className="body">
                <p className={cx('nickName')}>
                    <span>LongPhh</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>Long Phạm</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('space')}>.</span>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('space')}>.</span>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
