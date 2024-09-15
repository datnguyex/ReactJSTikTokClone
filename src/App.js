import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import Login from '~/component/Login';
import Comment from '~/component/Comment';
import './App.css';
import UpdateProfile from '~/component/UpdateProfile';
// import { DefaultLayout } from '~/Layouts';
import DefaultLayout from '~/Layouts';
import { Fragment, useEffect, useState, useCallback } from 'react';

function App() {
    const [displayLogin, setDisplayLogin] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [commentVideo, setCommentVideo] = useState(null);

    const handleSetUpdate = () => {
        setShowUpdate(!showUpdate);
    };
    const handleDisplayLogin = () => {
        setDisplayLogin(!displayLogin);
    };
    const handleCommentVideo = (item) => {
        setCommentVideo(item);
    };

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
                                    <Layout displayLogin={handleDisplayLogin}>
                                        <>
                                            {displayLogin == true ? (
                                                <Login displayLogin={handleDisplayLogin}></Login>
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
                                                <UpdateProfile showUpdate={showUpdate} onClick={handleSetUpdate} />
                                            ) : (
                                                <></>
                                            )}
                                            {route.path == '/:nickname' ? (
                                                <Page handleSetUpdate={handleSetUpdate} showUpdate={showUpdate} />
                                            ) : (
                                                <Page handleCommentVideo={handleCommentVideo} />
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
