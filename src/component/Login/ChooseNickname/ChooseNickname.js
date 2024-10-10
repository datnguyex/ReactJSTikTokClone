import { memo, useEffect, useState } from 'react';
import LoginForm from '~/component/Login/LoginForm';
import RegisterForm from '~/component/Login/RegisterForm';
import { EyeHiddenIcon, EyeOpenIcon, TickIcon, XWordIcon, ArrowLeftIcon } from '~/component/Icons';
import axios from 'axios';
import Menu from '~/component/Popper/Menu';
import styles from './ChooseNickname.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function ChooseNickname({
    handleNickNameOption1,
    listNickName,
    handleNickNameOption2,
    option,
    nickNameOption1,
    nickNameOption2,
    handleRotateLeave,
    handleRotate,
    handleSubmitRegister,
}) {
    return (
        <>
            <p className={cx('title-birthday')}>Create TikTok ID</p>
            <div className={cx('Wrap__input-ChooseLogin')}>
                <Menu
                    // placement="start-bottom"
                    getValue={handleNickNameOption1}
                    hideOnClick
                    className="chooseIDItem"
                    items={listNickName}
                    start={0}
                    end={0}
                >
                    <input
                        onChange={(e) => handleNickNameOption2(e)}
                        value={option == 1 ? nickNameOption1 : nickNameOption2}
                        onMouseLeave={handleRotateLeave}
                        onMouseEnter={() => handleRotate(1)}
                        className={cx('chooseIDItem')}
                        autoFocus
                    ></input>
                </Menu>
            </div>
            <p className={cx('birthday-suggest')}>you can always change this later.</p>
            <button
                onClick={handleSubmitRegister}
                className={cx('btn-log', {
                    'textchange-btnDigit': nickNameOption1 !== '' || nickNameOption2 !== '',
                })}
            >
                Sign Up
            </button>
            <button className={cx('btn-skip')}>
                <h1>skip</h1>
            </button>
        </>
    );
}

export default ChooseNickname;
