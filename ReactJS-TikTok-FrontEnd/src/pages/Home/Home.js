import classNames from 'classnames/bind';
import HomeItem from '~/pages/Home/HomeItem';
import style from './Home.module.scss';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(style);

function Home({ handleCommentVideo }) {
    return (
        <div id="wrapz" className={cx('wrapper')}>
            <HomeItem handleCommentVideo={handleCommentVideo} />
            <HomeItem />
            <HomeItem />
        </div>
    );
}

export default Home;
