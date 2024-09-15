import classNames from 'classnames/bind';
import style from './Search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import AccountItem from '~/component/AccountItem';
import axios from 'axios';
// import { request } from '~/utils/request';
import * as searchServices from '~/services/searchService';
import { Children, useEffect, useState, useRef } from 'react';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchIcon } from '~/component/Icons';
import { useDebounce } from '~/hooks';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faCloudUpload,
    faMessage,
    faL,
} from '@fortawesome/free-solid-svg-icons';
import { type } from '@testing-library/user-event/dist/type';
const cx = classNames.bind(style);
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    const debounceValue = useDebounce(searchValue, 300);

    useEffect(() => {
        // console.log('trong ');

        // if (searchValue.trim() == false) {
        //     return;
        // }
        //co the su ly theo cach nay

        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);
        const fetchApi = async () => {
            const result = await searchServices.search(debounceValue);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();

        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounceValue)}&type=less`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setSearchResult(data.data);
        //         setShowResult(true);
        //         setLoading(false);
        //         console.log('trong 2');
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching search results:', error);
        //         setLoading(false);
        //     });
    }, [debounceValue]);

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (searchValue.startsWith(' ')) {
            return;
        }
        setSearchValue(e.target.value);
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleClear = () => {
        setSearchResult([]);
        setSearchValue('');
        inputRef.current.focus();
    };
    // console.log('ngoai');
    return (
        <div>
            <HeadlessTippy
                // appendTo="parent"
                interactive
                visible={searchResult.length > 0 && showResult == true}
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        onChange={handleChange}
                        spellCheck={false}
                        placeholder="Search accounts and videos"
                        onFocus={() => setShowResult(true)}
                    ></input>
                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                handleClear();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button onMouseDown={(e) => e.preventDefault()} className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
