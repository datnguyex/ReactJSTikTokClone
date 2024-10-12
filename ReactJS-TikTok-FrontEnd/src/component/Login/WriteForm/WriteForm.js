import { memo, useEffect, useState } from 'react';
import LoginForm from '~/component/Login/LoginForm';
import RegisterForm from '~/component/Login/RegisterForm';
import ResetPassword from '~/component/Login/ResetPassword';
import ChooseNickname from '~/component/Login/ChooseNickname';
import { EyeHiddenIcon, EyeOpenIcon, TickIcon, XWordIcon, ArrowLeftIcon } from '~/component/Icons';
import axios from 'axios';
import styles from './WriteForm.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const WriteForm = ({ type, handleSetITEMS, handleTimeout, handleForm, handleUserValue }) => {
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
        setNickNameOption2('');
        if (option == 1) {
            return;
        } else {
            setOption(1);
        }
    };

    const handleNickNameOption2 = (e) => {
        setNickNameOption2(e.target.value);
        setNickNameOption1('');
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
        setDisplayReset(!displayReset);
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
    const handleSubmitRegister = () => {
        axios
            .post('http://127.0.0.1:8000/api/register', {
                email: valueEmail,
                nickNameOption1: nickNameOption1,
                nickNameOption2: nickNameOption2,
                day: valueDay,
                month: valueMonth,
                year: valueYear,
                password: valuePassWord,
            })
            .then((response) => {
                console.log('Response:', response.data);
                setContinueRegis(false);
                setDisplayReset(false);
                return handleSetITEMS();
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    };

    const fetchUserData = () => {
        const token = localStorage.getItem('token');
        axios
            .get('http://127.0.0.1:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            })
            .then((response) => {
                handleUserValue(response.data.data);
                handleTimeout();
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    };

    const handleSubmitLogin = () => {
        axios
            .post('http://127.0.0.1:8000/api/login', {
                email: valueEmail,
                password: valuePassWord,
            })
            .then((response) => {
                console.log('response', response);
                if (response.data.message === 'sucessed login') {
                    localStorage.setItem('token', response.data.token);
                    fetchUserData();
                    handleTimeout();
                }
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    };
    const handleSendCodeResetPassword = () => {
        axios
            .post('http://127.0.0.1:8000/api/sendCodeResetPassword', {
                email: valueEmail,
                code: valueCode,
            })
            .then((response) => {
                console.log('response', response);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    };
    const handleSubmitResetPassword = () => {
        axios
            .post('http://127.0.0.1:8000/api/sendCodeResetPassword', {
                email: valueEmail,
                code: valueCode,
                password: password,
            })
            .then((response) => {
                console.log('response', response);
                setContinueRegis(false);
                setDisplayReset(false);
                return handleDisplayReset();
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
                        <LoginForm
                            valueEmail={valueEmail}
                            valuePassWord={valuePassWord}
                            handleValueEmail={handleValueEmail}
                            handleValuePass={handleValuePass}
                            hidePass={hidePass}
                            handleSetHidePass={handleSetHidePass}
                            handleDisplayReset={handleDisplayReset}
                            handleSubmitLogin={handleSubmitLogin}
                        ></LoginForm>
                    </>
                ) : type === 'register' && continueRegis == false && displayReset === false ? (
                    <RegisterForm
                        handleRotate={handleRotate}
                        valueMonth={valueMonth}
                        valueDay={valueDay}
                        valueYear={valueYear}
                        handleValueDay={handleValueDay}
                        handleValueYear={handleValueYear}
                        handleValueEmail={handleValueEmail}
                        handleValuePass={handleValuePass}
                        handleCheckPassHave={handleCheckPassHave}
                        hidePass={hidePass}
                        handleSetHidePass={handleSetHidePass}
                        valueCode={valueCode}
                        rotatedIndex={rotatedIndex}
                        handleRotateLeave={handleRotateLeave}
                        handleValueMonth={handleValueMonth}
                        handleValueCode={handleValueCode}
                        valueEmail={valueEmail}
                        valuePassWord={valuePassWord}
                        checkClause={checkClause}
                        handleSendCode={handleSendCode}
                        handleCheckClause={handleCheckClause}
                    ></RegisterForm>
                ) : continueRegis == false && displayReset === true ? (
                    <>
                        {/* resetPass */}
                        <ResetPassword
                            valueEmail={valueEmail}
                            password={password}
                            valueCode={valueCode}
                            handleValueEmail={handleValueEmail}
                            handleValueCode={handleValueCode}
                            handleSendCodeResetPassword={handleSendCodeResetPassword}
                            handleSetValue={handleSetValue}
                            handleCheckPassHave={handleCheckPassHave}
                            hidePass={hidePass}
                            handleSetHidePass={handleSetHidePass}
                            handleSubmitResetPassword={handleSubmitResetPassword}
                        ></ResetPassword>
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
                    </>
                ) : (
                    <></>
                )}
                {/* sign up */}
                {/* continueRegis */}
                {continueRegis == true ? (
                    <ChooseNickname
                        handleNickNameOption1={handleNickNameOption1}
                        listNickName={listNickName}
                        handleNickNameOption2={handleNickNameOption2}
                        option={option}
                        nickNameOption1={nickNameOption1}
                        nickNameOption2={nickNameOption2}
                        handleRotateLeave={handleRotateLeave}
                        handleRotate={handleRotate}
                        handleSubmitRegister={handleSubmitRegister}
                    ></ChooseNickname>
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
