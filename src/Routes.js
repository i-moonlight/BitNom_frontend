import { ApolloProvider } from '@apollo/client';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BnChat from './pages/dasboard/bn_chat/BNChat';
// import BnConnect from './pages/dasboard/bn_connect/BnConnect';
import HashtagView from './pages/dasboard/bn_connect/HashtagView';
import PostView from './pages/dasboard/bn_connect/scroll/ScrollView';
import ConnectProfile from './pages/dasboard/bn_connect/ConnectProfile';
import BnKnowledgeCenter from './pages/dasboard/bn_knowledge_center/BnKnowledgeCenter';
import CoinDetails from './pages/dasboard/bn_knowledge_center/con_details/CoinDetails';
import BnServices from './pages/dasboard/bn_services/BnServices';
import SavedItems from './pages/dasboard/bookmarks/SavedItems';
import Events from './pages/dasboard/events/Events';
import EventView from './pages/dasboard/events/EventView';
import Notifications from './pages/dasboard/notifications/Notifications';
import Connections from './pages/dasboard/people/Connections';
import People from './pages/dasboard/people/People';
import Profile from './pages/dasboard/profile/Profile';
import ProfileView from './pages/dasboard/profile/ProfileView';
import Posts from './pages/dasboard/profile/UserPosts';
import Redirect from './utilities/Redirect';
import TrendingPostsView from './pages/dasboard/bn_connect/TrendindPostsView';

const FeatureRequest = React.lazy(() =>
    import('./pages/welcome/feature_request/FeatureRequest')
);
const Disclaimer = React.lazy(() =>
    import('./pages/welcome/disclaimer/Disclaimer')
);
const Investors = React.lazy(() =>
    import('./pages/welcome/investor/Investors')
);
const RequireVerification = React.lazy(() =>
    import('./pages/auth/RequireVerification')
);
const TestComponent = React.lazy(() =>
    import('./test_component/TestComponent')
);
const CreatePassword = React.lazy(() => import('./pages/auth/CreatePassword'));
const ResetPassword = React.lazy(() => import('./pages/auth/ResetPassword'));
const Support = React.lazy(() => import('./pages/welcome/investor/Support'));
const Landing = React.lazy(() => import('./pages/welcome/landing/Landing'));
const Privacy = React.lazy(() => import('./pages/welcome/privacy/Privacy'));
const RoadMap = React.lazy(() => import('./pages/welcome/roadmap/RoadMap'));
const Cookie = React.lazy(() => import('./pages/welcome/cookie/Cookie'));
const VerifyEmail = React.lazy(() => import('./pages/auth/VerifyEmail'));
const UpdateInfo = React.lazy(() => import('./pages/auth/UpdateInfo'));
const Terms = React.lazy(() => import('./pages/welcome/terms/Terms'));
const Faqs = React.lazy(() => import('./pages/welcome/faqs/Faqs'));
const Signup = React.lazy(() => import('./pages/auth/Signup'));
const Login = React.lazy(() => import('./pages/auth/Login'));

const BnConnect = React.lazy(() =>
    import('./pages/dasboard/bn_connect/BnConnect')
);

export default function Routes({ apolloClient }) {
    return (
        <>
            <BrowserRouter>
                <ApolloProvider client={apolloClient}>
                    <Switch>
                        <Suspense
                            fallback={
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#000',
                                        zIndex: 2100,
                                    }}
                                >
                                    <div className="preloader-speeding-wheel"></div>
                                </div>
                            }
                        >
                            <>
                                {/* Landing */}
                                <Route exact component={Landing} path="/" />
                                <Route exact component={Faqs} path="/faqs" />
                                <Route exact component={Terms} path="/terms" />
                                <Route
                                    exact
                                    component={Privacy}
                                    path="/privacy_policy"
                                />
                                <Route
                                    exact
                                    component={Cookie}
                                    path="/cookie_policy"
                                />
                                <Route
                                    exact
                                    component={Disclaimer}
                                    path="/disclaimer"
                                />
                                <Route
                                    exact
                                    component={FeatureRequest}
                                    path="/feature_request"
                                />
                                <Route
                                    exact
                                    component={RoadMap}
                                    path="/roadmap"
                                />
                                <Route
                                    exact
                                    component={Redirect}
                                    path="/redirect"
                                />
                                <Route
                                    exact
                                    component={TestComponent}
                                    path="/test-component"
                                />

                                {/* Investor  */}
                                <Route
                                    exact
                                    component={Investors}
                                    path="/investors"
                                />
                                <Route
                                    exact
                                    component={Support}
                                    path="/support"
                                />

                                {/* Auth */}
                                <Route
                                    exact
                                    component={Login}
                                    path="/auth/login"
                                />
                                <Route
                                    exact
                                    component={Signup}
                                    path="/auth/signup"
                                />
                                <Route
                                    exact
                                    component={UpdateInfo}
                                    path="/auth/update_info_register"
                                />
                                <Route
                                    exact
                                    component={RequireVerification}
                                    path="/auth/require_verify"
                                />
                                <Route
                                    exact
                                    component={VerifyEmail}
                                    path="/auth/verify_email"
                                />
                                <Route
                                    exact
                                    component={ResetPassword}
                                    path="/auth/request_reset_link"
                                />
                                <Route
                                    exact
                                    component={CreatePassword}
                                    path="/auth/password_reset/:key"
                                />

                                {/* Dashboard */}
                                <Route
                                    exact
                                    component={BnConnect}
                                    path="/connect"
                                />
                                <Route
                                    exact
                                    component={ConnectProfile}
                                    path="/connect/profile"
                                />
                                <Route
                                    exact
                                    component={TrendingPostsView}
                                    path="/connect/trending"
                                />
                                <Route exact component={BnChat} path="/chat" />
                                <Route
                                    exact
                                    component={BnServices}
                                    path="/services"
                                />
                                <Route
                                    exact
                                    component={BnKnowledgeCenter}
                                    path="/knowledge_center/cryptocurrency"
                                />
                                <Route
                                    exact
                                    component={CoinDetails}
                                    path="/knowledge_center/cryptocurrency/:id"
                                />

                                <Route
                                    exact
                                    component={Events}
                                    path="/events"
                                />
                                <Route
                                    exact
                                    component={EventView}
                                    path="/events/:eventId"
                                />
                                <Route
                                    exact
                                    component={People}
                                    path="/people"
                                />
                                <Route
                                    exact
                                    component={Connections}
                                    path="/profile/friends/:active_tab?"
                                />
                                <Route
                                    exact
                                    component={HashtagView}
                                    path="/hashtags/:hashtag"
                                />
                                <Route
                                    exact
                                    component={PostView}
                                    path="/posts/:postId"
                                />
                                <Route
                                    exact
                                    component={Posts}
                                    path="/profile/posts"
                                />
                                <Route
                                    exact
                                    component={Profile}
                                    path="/profile"
                                />
                                <Route
                                    exact
                                    component={SavedItems}
                                    path="/profile/bookmarks"
                                />
                                <Route
                                    exact
                                    component={Notifications}
                                    path="/notifications"
                                />
                                <Route
                                    exact
                                    component={ProfileView}
                                    path="/users/:id"
                                />
                                {/* <Route component={NotFound} path='*' /> */}
                            </>
                        </Suspense>
                    </Switch>
                </ApolloProvider>
            </BrowserRouter>
        </>
    );
}
