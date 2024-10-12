import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { memo, useEffect, useState } from 'react';
import axios, { all } from 'axios';
const cx = classNames.bind(styles);
function SuggestedAccounts({ label, userValue }) {
    const [allUser, setAllUser] = useState([]);
    const [displayUser, setDisplayUser] = useState([]);
    const [checkUser, setCheckUser] = useState(false);
    const getAllUser = () => {
        axios
            .get('http://127.0.0.1:8000/api/getAllUser')
            .then((response) => {
                const value = userValue.id;
                const filterUsers = response.data.data.filter((user) => user.id !== value);
                setAllUser(filterUsers);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            });
    };
    const handleDisplayUser = () => {
        checkUser ? setDisplayUser(allUser) : setDisplayUser(allUser.slice(0, 3));
    };
    const handleDisplayAll = () => {
        setCheckUser(!checkUser);
    };

    useEffect(() => {
        getAllUser();
    }, []);
    useEffect(() => {
        handleDisplayUser();
    }, [allUser, checkUser]);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {displayUser.map((user, index) => (
                <AccountItem user={user} />
            ))}
            <p onClick={handleDisplayAll} className={cx('more-btn')}>
                See {checkUser == false ? 'All' : 'Less'}
            </p>
        </div>
    );
}
SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};
export default memo(SuggestedAccounts);
