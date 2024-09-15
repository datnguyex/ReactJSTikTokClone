import styles from './WriteForm.module.scss';
import classNames from 'classnames/bind';
import { memo, useState } from 'react';
import { EyeHiddenIcon, EyeOpenIcon, TickIcon, TriangleIcon, XWordIcon, ArrowLeftIcon } from '~/component/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ItemsMonth, ItemsDay, ItemsYear } from '~/component/Array';
import Menu from '~/component/Popper/Menu';
const cx = classNames.bind(styles);

const WriteForm = ({ type, handleTimeout, handleForm }) => {
    const [valueMonth, setValueMonth] = useState('');
    const [valueDay, setValueDay] = useState('');
    const [valueYear, setValueYear] = useState('');
    const [hidePass, setHidePass] = useState(false);
    const [checkPassHave, setCheckPassHave] = useState(false);
    const [password, setPassword] = useState('');
    const [rotatedIndex, setRotatedIndex] = useState('');
    const [checkClause, setCheckClause] = useState(false);
    const [displayReset, setDisplayReset] = useState(false);
    const handleValueMonth = (value) => {
        setValueMonth(value);
    };
    const handleValueDay = (value) => {
        setValueDay(value);
    };
    const handleValueYear = (value) => {
        setValueYear(value);
    };
    const handleSetHidePass = () => {
        setHidePass(!hidePass);
    };
    const handleCheckPassHave = () => {
        setCheckPassHave(!checkPassHave);
    };
    const handleSetValue = (e) => {
        setPassword(e.target.value);
    };
    const handleCheckClause = () => {
        setCheckClause(!checkClause);
    };

    const isValidPassword = (pwd) => {
        const hasSpecialChar = /[!@#$%^&*()_+{}|:"<>?]/;
        const hasNumber = /[0-9]/;
        const hasLetter = /[a-zA-Z]/;
        return hasNumber.test(pwd) && hasSpecialChar.test(pwd) && hasLetter.test(pwd);
    };
    const handleRotate = (index) => {
        setRotatedIndex(rotatedIndex == index ? null : index);
    };
    const handleRotateLeave = (index) => {
        setRotatedIndex(null);
    };
    const handleDisplayReset = () => {
        setDisplayReset(true);
    };

    return (
        <>
            <div className={cx('content')}>
                <h2 className={cx('title')}>Sign up</h2>
                <span onClick={handleTimeout} className={cx('close-btn')}>
                    <XWordIcon />
                </span>
                {displayReset == true ? (
                    <span
                        onClick={() => {
                            handleForm('');
                        }}
                        className={cx('previous-btn')}
                    >
                        <ArrowLeftIcon />
                    </span>
                ) : (
                    <></>
                )}

                {/* sign in */}
                {type === 'login' && displayReset === false ? (
                    <>
                        <div className={cx('ChooseLogin')}>
                            <p>Email or username</p>
                            <p className={cx('text-ChooseLogin')}>Let’s get started!</p>
                        </div>
                        <input placeholder="Email or Username" className={cx('input-ChooseLogin')} />
                        <div className={cx('Wrap__input-ChooseLogin')}>
                            <input
                                type={hidePass ? 'text' : 'password'}
                                placeholder="Password"
                                className={cx('input-ChooseLogin')}
                            />
                            <span onClick={handleSetHidePass} className={cx('iconPass')}>
                                {hidePass ? <EyeOpenIcon /> : <EyeHiddenIcon />}
                            </span>
                        </div>
                        <p onClick={handleDisplayReset} className={cx('text-forgot')}>
                            Forgot password?
                        </p>
                        <button className={cx('btn-log')}>Login</button>
                    </>
                ) : type === 'register' && displayReset === false ? (
                    <>
                        <p className={cx('title-birthday')}>When’s your birthday?</p>
                        <div className={cx('wrap-conten__birthday')}>
                            <Menu
                                start={0}
                                end={0}
                                getValue={handleValueMonth}
                                hideOnClick
                                className="wrap-popper_birthday"
                                items={ItemsMonth}
                            >
                                <div
                                    onMouseLeave={handleRotateLeave}
                                    onMouseEnter={() => handleRotate(0)}
                                    className={cx('birthday-item')}
                                >
                                    <p className={cx(valueMonth ? 'value-Have' : '')}>{valueMonth || 'Month'}</p>
                                    <span className={cx('birthday-item__icon')}>
                                        <FontAwesomeIcon
                                            className={cx('birthday-item__icon', {
                                                'rotate-icon': rotatedIndex === 0,
                                                notRotate: rotatedIndex !== 0,
                                            })}
                                            icon={faAngleDown}
                                        />
                                    </span>
                                </div>
                            </Menu>
                            <Menu
                                getValue={handleValueDay}
                                hideOnClick
                                className="wrap-popper_birthday"
                                items={ItemsDay}
                                start={0}
                                end={0}
                            >
                                <div
                                    onMouseLeave={handleRotateLeave}
                                    onMouseEnter={() => handleRotate(1)}
                                    className={cx('birthday-item')}
                                >
                                    <p className={cx(valueDay ? 'value-Have' : '')}>{valueDay || 'Day'}</p>
                                    <span className={cx('birthday-item__icon')}>
                                        <FontAwesomeIcon
                                            className={cx('birthday-item__icon', {
                                                'rotate-icon': rotatedIndex === 1,
                                                notRotate: rotatedIndex !== 1,
                                            })}
                                            icon={faAngleDown}
                                        />
                                    </span>
                                </div>
                            </Menu>
                            <Menu
                                start={0}
                                end={0}
                                getValue={handleValueYear}
                                hideOnClick
                                className="wrap-popper_birthday"
                                items={ItemsYear}
                            >
                                <div
                                    onMouseLeave={handleRotateLeave}
                                    onMouseEnter={() => handleRotate(2)}
                                    className={cx('birthday-item')}
                                >
                                    <p className={cx(valueYear ? 'value-Have' : '')}>{valueYear || 'Year'}</p>
                                    <span className={cx('birthday-item__icon')}>
                                        <FontAwesomeIcon
                                            className={cx('birthday-item__icon', {
                                                'rotate-icon': rotatedIndex === 2,
                                                notRotate: rotatedIndex !== 2,
                                            })}
                                            icon={faAngleDown}
                                        />
                                    </span>
                                </div>
                            </Menu>
                        </div>
                        <p className={cx('birthday-suggest')}>Your birthday won't be shown publicly.</p>
                        <div className={cx('ChooseLogin')}>
                            <p>Email</p>
                            <p className={cx('text-ChooseLogin')}>Let’s get started!</p>
                        </div>
                        <input placeholder="Email" className={cx('input-ChooseLogin')} />
                        <div className={cx('Wrap__input-ChooseLogin')}>
                            <input
                                onChange={handleSetValue}
                                onClick={handleCheckPassHave}
                                type={hidePass ? 'text' : 'password'}
                                placeholder="Password"
                                className={cx('input-ChooseLogin')}
                            />
                            <span onClick={handleSetHidePass} className={cx('iconPass')}>
                                {hidePass ? <EyeOpenIcon /> : <EyeHiddenIcon />}
                            </span>
                        </div>
                        <div className={cx('wrap-digit')}>
                            <input className={cx('enter-digit')} placeholder="Enter 6-digit code" />
                            <button className={cx('btn-digit')}>Send code</button>
                        </div>
                        <div className={cx('wrap__signup-agree')}>
                            <input
                                onClick={handleCheckClause}
                                readOnly
                                className={cx('check__signup-agree', checkClause ? 'check-success' : '')}
                            />
                            <label onClick={handleCheckClause} className={cx('icon_signup_clause')}>
                                {checkClause && <TickIcon fill="#fff" width="2.2rem" height="2.2rem" />}
                            </label>
                            <label className={cx('text__signup-agree')}>
                                Get trending content, newsletters, promotions, recommendations, and account updates sent
                                to your email
                            </label>
                        </div>
                        <button className={cx('btn-log')}>Next</button>
                    </>
                ) : (
                    <>
                        {/* resetPass */}
                        <div className={cx('ChooseLogin')}>
                            <p>Enter email address</p>
                            <p className={cx('text-ChooseLogin')}>Let’s get started!</p>
                        </div>
                        <input placeholder={'Email or Username'} className={cx('input-ChooseLogin')} />
                        <div className={cx('wrap-digit')}>
                            <input className={cx('enter-digit')} placeholder="Enter 6-digit code" />
                            <button className={cx('btn-digit')}>Send code</button>
                        </div>
                        <div className={cx('Wrap__input-ChooseLogin')}>
                            <input
                                onChange={(e) => handleSetValue(e)}
                                onClick={handleCheckPassHave}
                                type={hidePass == false ? 'password' : 'text'}
                                placeholder={'Password'}
                                className={cx('input-ChooseLogin')}
                            />

                            {hidePass == false ? (
                                <span onClick={handleSetHidePass} className={cx('iconPass')}>
                                    <EyeHiddenIcon />
                                </span>
                            ) : (
                                <span onClick={handleSetHidePass} className={cx('iconPass')}>
                                    <EyeOpenIcon />
                                </span>
                            )}
                        </div>
                        {checkPassHave == true ? (
                            <>
                                <p classNames={cx('title-passHave')}>Your password must have </p>
                                <div
                                    className={cx('wrap-passHave', {
                                        truePass: password.length >= 8 && password.length <= 20,
                                    })}
                                >
                                    <span className={cx('tickIcon-pass')}>
                                        <TickIcon />
                                    </span>
                                    <p className={cx('text-passHave')}>8 to 20 characters</p>
                                </div>
                                <div
                                    className={cx('wrap-passHave', {
                                        truePass: isValidPassword(password),
                                    })}
                                >
                                    <span className={cx('tickIcon-pass')}>
                                        <TickIcon />
                                    </span>
                                    <p className={cx('text-passHave,')}>Letters, numbers, and special characters</p>
                                </div>{' '}
                            </>
                        ) : (
                            <></>
                        )}
                        <button className={cx('btn-log')}>Login</button>
                    </>
                )}

                {/* sign up */}
            </div>
            {/* sign up */}
            {type == 'register' ? (
                <>
                    {' '}
                    <p className={cx('login-terms')}>
                        By continuing with an account located in Vietnam, you agree to our
                        <span className={cx('space')}>.</span>
                        <a href="" className={cx('Policy')}>
                            Terms of Service
                        </a>
                        and acknowledge that you have read our
                        <span className={cx('space')}>.</span>
                        <a href="" className={cx('Policy')}>
                            Privacy Policy.
                        </a>
                    </p>
                    <div className={cx('SignUp')}>
                        <p>Already have an account</p>
                        <a className={cx('text-SignUp')}>Log in</a>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
};
export default memo(WriteForm);
