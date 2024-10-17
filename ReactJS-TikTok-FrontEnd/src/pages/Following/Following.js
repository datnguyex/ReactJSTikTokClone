import classNames from 'classnames/bind';
import FollowingItem from '~/pages/Following/FollowingItem';
import style from './Following.module.scss';
import { memo, useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(style);

function Following({ userValue, reaload }) {
    const [usersFollowing, SetUsersFollowing] = useState([]);
    const [checkReload, setChechReload] = useState();
    const fetchUsersFollowing = () => {
        axios
            .get('http://127.0.0.1:8000/api/getVideoFollowingUsers', {
                params: {
                    user_id: userValue.id,
                },
            })
            .then((response) => {
                SetUsersFollowing(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            });
    };
    // console.log('usersFollowing', usersFollowing);

    useEffect(() => {
        if (!userValue) {
            return;
        }
        fetchUsersFollowing();
    }, [userValue]);
    useEffect(() => {
        if (reaload != checkReload) {
            setChechReload(reaload);
        }
    }, [reaload]);
    useEffect(() => {
        fetchUsersFollowing();
    }, [checkReload]);
    return (
        <div id="wrapz" className={cx('wrapper')}>
            {usersFollowing.map((index) => (
                <FollowingItem usersFollowing={index} />
            ))}
        </div>
    );
}

export default memo(Following);
