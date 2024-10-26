import classNames from 'classnames/bind';
import HomeItem from '~/pages/Home/HomeItem';
import style from './Home.module.scss';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
const cx = classNames.bind(style);

function Home({ handleCommentVideo, userValue, reaload }) {
    const [usersSuggested, SetUsersSuggested] = useState([]);
    const [checkReload, setChechReload] = useState();
    const fetchUsersSuggested = () => {
        if (!userValue) {
            return;
        }
        axios
            .get('http://localhost:8000/api/getVideoSuggested', {
                params: {
                    user_id: userValue.id,
                },
            })
            .then((response) => {
                SetUsersSuggested(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            });
    };

    useEffect(() => {
        if (!userValue) {
            return;
        }
        fetchUsersSuggested();
    }, [userValue]);
    useEffect(() => {
        if (reaload != checkReload) {
            setChechReload(reaload);
        }
    }, [reaload]);
    useEffect(() => {
        fetchUsersSuggested();
    }, [checkReload]);
    return (
        <div id="wrapz" className={cx('wrapper')}>
            {usersSuggested.map((index) => (
                <HomeItem handleCommentVideo={handleCommentVideo} usersSuggested={index} />
            ))}
        </div>
    );
}

export default Home;
