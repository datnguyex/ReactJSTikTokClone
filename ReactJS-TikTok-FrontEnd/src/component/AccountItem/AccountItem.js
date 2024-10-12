import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './AccountItem.module.scss';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Image } from '~/component/Image/';
import PropTypes from 'prop-types';
import { useState } from 'react';
const cx = classNames.bind(style);

function AccountItem({ data }) {
    // console.log('searchResult', data);
    // const [urlAccount, setUrlAccount] = useState(data.nickname);
    return (
        <Link className={cx('wrapper')}>
            <Image
                className={cx('avatar')}
                src={data.avatar}
                alt={data.full_name}
                fallback="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
            ></Image>

            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <p className={cx('username')}>{data.nickname}</p>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default AccountItem;
