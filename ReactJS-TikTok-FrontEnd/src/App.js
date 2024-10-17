import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import Login from '~/component/Login';
import LogOut from '~/component/LogOut';
import Comment from '~/component/Comment';
import './App.css';
import UpdateProfile from '~/component/UpdateProfile';
// import { DefaultLayout } from '~/Layouts';
import DefaultLayout from '~/Layouts';
import { Fragment, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function App() {
    const [userValue, setUserValue] = useState();
    const [displayLogin, setDisplayLogin] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [commentVideo, setCommentVideo] = useState(null);
    const [displayLogOut, setDisPlayLogOut] = useState(false);
    const [reaload, setReload] = useState(false);
    const handleReloadSidebar = () => {
        setReload(!reaload);
    };
    const handleSetUpdate = () => {
        setShowUpdate(!showUpdate);
    };

    const handleDisplayLogin = () => {
        setDisplayLogin(!displayLogin);
    };
    const handleCommentVideo = (item) => {
        setCommentVideo(item);
    };
    const handleUserValue = (item) => {
        setUserValue(item);
    };
    const handleDisPlayLogOut = () => {
        setDisPlayLogOut(!displayLogOut);
    };
    const fetchUserValue = () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://127.0.0.1:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                })
                .then((response) => {
                    setUserValue(response.data.data);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        } else {
            return;
        }
    };
    useEffect(() => {
        fetchUserValue();
    }, []);
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;

                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <div className="app-wrap">
                                    <Layout
                                        reaload={reaload}
                                        handleReloadSidebar={handleReloadSidebar}
                                        handleDisPlayLogOut={handleDisPlayLogOut}
                                        userValue={userValue}
                                        displayLogin={handleDisplayLogin}
                                    >
                                        <>
                                            {displayLogOut == true ? (
                                                <LogOut
                                                    handleUserValue={handleUserValue}
                                                    handleDisPlayLogOut={handleDisPlayLogOut}
                                                ></LogOut>
                                            ) : (
                                                <></>
                                            )}
                                            {displayLogin == true ? (
                                                <Login
                                                    handleUserValue={handleUserValue}
                                                    displayLogin={handleDisplayLogin}
                                                ></Login>
                                            ) : (
                                                <></>
                                            )}
                                            {commentVideo != null ? (
                                                <Comment
                                                    handleCommentVideo={handleCommentVideo}
                                                    commentVideo={commentVideo}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            {showUpdate == true ? (
                                                <UpdateProfile
                                                    handleUserValue={handleUserValue}
                                                    userValue={userValue}
                                                    showUpdate={showUpdate}
                                                    onClick={handleSetUpdate}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            {route.path == '/:nickname' ? (
                                                <Page
                                                    reaload={reaload}
                                                    handleReloadSidebar={handleReloadSidebar}
                                                    userValue={userValue}
                                                    handleSetUpdate={handleSetUpdate}
                                                    showUpdate={showUpdate}
                                                />
                                            ) : (
                                                <Page
                                                    reaload={reaload}
                                                    userValue={userValue}
                                                    handleCommentVideo={handleCommentVideo}
                                                />
                                            )}
                                        </>
                                    </Layout>
                                </div>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
