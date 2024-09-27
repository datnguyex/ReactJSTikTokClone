import { memo, useEffect, useState } from 'react';
import { EyeHiddenIcon, EyeOpenIcon, TickIcon, TriangleIcon, XWordIcon, ArrowLeftIcon } from '~/component/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ItemsMonth, ItemsDay, ItemsYear } from '~/component/Array';
import Menu from '~/component/Popper/Menu';
import axios from 'axios';
import styles from './WriteForm.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const WriteForm = ({ type, handleTimeout, handleForm }) => {
    const [listNickName, setListNickName] = useState([]);
    const [valueMonth, setValueMonth] = useState('');
    const [valueDay, setValueDay] = useState('');
    const [valueYear, setValueYear] = useState('');
    const [hidePass, setHidePass] = useState(false);
    const [checkPassHave, setCheckPassHave] = useState(false);
    const [password, setPassword] = useState('');
    const [rotatedIndex, setRotatedIndex] = useState('');
    const [checkClause, setCheckClause] = useState(false);
    const [displayReset, setDisplayReset] = useState(false);
    const [continueRegis, setContinueRegis] = useState(false);
    const [valueEmail, setValueEmail] = useState('');
    const [valuePassWord, setValuePassword] = useState('');
    const [valueCode, setValueCode] = useState(null);
    const [checkSwitch, setCheckSwitch] = useState(true);
    const [option, setOption] = useState('');
    const [nickNameOption1, setNickNameOption1] = useState('');
    const [nickNameOption2, setNickNameOption2] = useState('');

    const handleNickNameOption1 = (value) => {
        setNickNameOption1(value);
        if (option == 1) {
            return;
        } else {
            setOption(1);
        }
    };

    const handleNickNameOption2 = (e) => {
        setNickNameOption2(e.target.value);
        if (option == 2) {
            return;
        } else {
            setOption(2);
        }
    };
    const handleValueCode = (e) => {
        setValueCode(e);
    };
    const handleValuePass = (e) => {
        setValuePassword(e);
    };
    const handleValueEmail = (e) => {
        setValueEmail(e);
    };
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

    const handleSendCode = () => {
        axios
            .post('http://127.0.0.1:8000/api/sendEmailCreateAccount', {
                email: valueEmail,
                code: valueCode,
            })
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data.message == 'Sent successfully') {
                    setCheckSwitch('continueRegis');
                    return setContinueRegis(true);
                }
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    };
    const fetchNickName = () => {
        axios
            .get('http://127.0.0.1:8000/api/suggestNickName', {})
            .then((response) => {
                setListNickName(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    };

    useEffect(() => {
        if (checkSwitch == 'continueRegis') {
            fetchNickName();
        }
    }, [checkSwitch]);

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
                {type === 'login' && continueRegis == false && displayReset === false ? (
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
                ) : type === 'register' && continueRegis == false && displayReset === false ? (
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
                        <input
                            onChange={(e) => {
                                handleValueEmail(e.target.value);
                            }}
                            placeholder="Email"
                            className={cx('input-ChooseLogin')}
                        />
                        <div className={cx('Wrap__input-ChooseLogin')}>
                            <input
                                onChange={(e) => {
                                    handleValuePass(e.target.value);
                                }}
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
                            <input
                                value={valueCode}
                                onChange={(e) => handleValueCode(e.target.value)}
                                className={cx('enter-digit')}
                                placeholder="Enter 6-digit code"
                            />
                            <div
                                onClick={
                                    valueDay != '' &&
                                    valueMonth !== '' &&
                                    valueYear != '' &&
                                    valueEmail != '' &&
                                    valuePassWord != '' &&
                                    checkClause != false
                                        ? handleSendCode
                                        : null
                                }
                                className={cx('btn-digit', {
                                    'textchange-btnDigit':
                                        valueDay !== '' &&
                                        valueMonth !== '' &&
                                        valueYear !== '' &&
                                        valueEmail !== '' &&
                                        checkClause === true &&
                                        valuePassWord !== '',
                                })}
                            >
                                Send code
                            </div>
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
                        <button
                            onClick={
                                valueDay != '' &&
                                valueMonth !== '' &&
                                valueYear != '' &&
                                valueEmail != '' &&
                                valuePassWord != '' &&
                                valueCode != '' &&
                                checkClause != false
                                    ? handleSendCode
                                    : null
                            }
                            className={cx('btn-log', {
                                'textchange-btnDigit':
                                    valueDay !== '' &&
                                    valueMonth !== '' &&
                                    valueYear !== '' &&
                                    valueEmail !== '' &&
                                    checkClause === true &&
                                    valuePassWord !== '' &&
                                    valueCode !== null,
                            })}
                        >
                            Next
                        </button>
                    </>
                ) : continueRegis == false && displayReset === true ? (
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
                ) : (
                    <></>
                )}
                {/* sign up */}
                {/* continueRegis */}
                {continueRegis == true ? (
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
                                ></input>
                            </Menu>
                        </div>
                        <p className={cx('birthday-suggest')}>you can always change this later.</p>
                        <button className={cx('btn-log')}>Sign Up</button>
                        <button className={cx('btn-skip')}>
                            <h1>skip</h1>
                        </button>
                    </>
                ) : (
                    <></>
                )}
            </div>
            {/* continueRegis */}
            {continueRegis == true ? (
                <div className={cx('nextRegisterHave')}>
                    <p>Already have an account</p>
                    <a className={cx('text-nextRegisterHave')}>Log in</a>
                </div>
            ) : (
                <></>
            )}

            {/* sign up */}
            {type == 'register' && continueRegis == false ? (
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
