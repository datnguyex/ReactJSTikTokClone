import { QRCodeIcon } from '~/component/Icons';
import styles from './Listform.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);

function Listform({ handleForm, ITEMS, title, type }) {
    return (
        <>
            <h2 className={cx('title-login')}>{title}</h2>
            <div className={cx('types')}>
                {ITEMS.map((item, index) =>
                    item.title === 'Use phone / email / username' ? (
                        type === 'login' ? (
                            <div onClick={() => handleForm('login')} key={index} className={cx('type-item')}>
                                <span className={cx('icon-item')}>{item.icon}</span>
                                <p className={cx('text-item')}>{item.title}</p>
                            </div>
                        ) : (
                            <div onClick={() => handleForm('register')} key={index} className={cx('type-item')}>
                                <span className={cx('icon-item')}>{item.icon}</span>
                                <p className={cx('text-item')}>{item.title}</p>
                            </div>
                        )
                    ) : (
                        <div key={index} className={cx('type-item')}>
                            <span className={cx('icon-item')}>{item.icon}</span>
                            <p className={cx('text-item')}>{item.title}</p>
                        </div>
                    ),
                )}
            </div>
        </>
    );
}

export default Listform;
