import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreatePassword from './pages/auth/CreatePassword';
import Login from './pages/auth/Login';
import RequireVerification from './pages/auth/RequireVerification';
import ResetPassword from './pages/auth/ResetPassword';
import Signup from './pages/auth/Signup';
import UpdateInfo from './pages/auth/UpdateInfo';
import VerifyEmail from './pages/auth/VerifyEmail';
import BnConnect from './pages/dasboard/bn_connect/BnConnect';
import BnServices from './pages/dasboard/bn_services/BnServices';
import SavedItems from './pages/dasboard/bookmarks/SavedItems';
import Events from './pages/dasboard/events/Events';
import EventView from './pages/dasboard/events/EventView';
import PostView from './pages/dasboard/bn_connect/scroll/ScrollView';
import Notifications from './pages/dasboard/notifications/Notifications';
import Connections from './pages/dasboard/people/Connections';
import People from './pages/dasboard/people/People';
import Profile from './pages/dasboard/profile/Profile';
import ProfileView from './pages/dasboard/profile/ProfileView';
import Posts from './pages/dasboard/profile/UserPosts';
import Cookie from './pages/welcome/cookie/Cookie';
import Disclaimer from './pages/welcome/disclaimer/Disclaimer';
import Faqs from './pages/welcome/faqs/Faqs';
import FeatureRequest from './pages/welcome/feature_request/FeatureRequest';
import Investors from './pages/welcome/investor/Investors';
import Support from './pages/welcome/investor/Support';
import Landing from './pages/welcome/landing/Landing';
import Privacy from './pages/welcome/privacy/Privacy';
import RoadMap from './pages/welcome/roadmap/RoadMap';
import Terms from './pages/welcome/terms/Terms';
import TestComponent from './test_component/TestComponent';
import Redirect from './utilities/Redirect';
import BnKnowledgeCenter from './pages/dasboard/bn_knowledge_center/BnKnowledgeCenter';
import BnChat from './pages/dasboard/bn_chat/BNChat';

export default function Routes({ apolloClient }) {
    return (
        <>
            <BrowserRouter>
                <ApolloProvider client={apolloClient}>
                    <Switch>
                        {/* Landing */}
                        <Route exact component={Landing} path="/" />
                        <Route exact component={Faqs} path="/faqs" />
                        <Route exact component={Terms} path="/terms" />
                        <Route
                            exact
                            component={Privacy}
                            path="/privacy_policy"
                        />
                        <Route exact component={Cookie} path="/cookie_policy" />
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
                        <Route exact component={RoadMap} path="/roadmap" />
                        <Route exact component={Redirect} path="/redirect" />
                        <Route
                            exact
                            component={TestComponent}
                            path="/test-component"
                        />

                        {/* Investor  */}
                        <Route exact component={Investors} path="/investors" />
                        <Route exact component={Support} path="/support" />

                        {/* Auth */}
                        <Route exact component={Login} path="/auth/login" />
                        <Route exact component={Signup} path="/auth/signup" />
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
                        <Route exact component={BnConnect} path="/dashboard" />
                        <Route
                            exact
                            component={BnChat}
                            path="/dashboard/chat"
                        />
                        <Route
                            exact
                            component={BnServices}
                            path="/dashboard/services"
                        />
                        <Route
                            exact
                            component={BnKnowledgeCenter}
                            path="/dashboard/knowledge_center"
                        />
                        <Route
                            exact
                            component={Events}
                            path="/dashboard/events"
                        />
                        <Route
                            exact
                            component={EventView}
                            path="/dashboard/events/:id"
                        />
                        <Route
                            exact
                            component={People}
                            path="/dashboard/people"
                        />
                        <Route
                            exact
                            component={Connections}
                            path="/dashboard/profile/connections"
                        />
                        <Route
                            exact
                            component={Posts}
                            path="/dashboard/profile/posts"
                        />
                        <Route
                            exact
                            component={PostView}
                            path="/dashboard/posts/:id"
                        />
                        <Route
                            exact
                            component={Profile}
                            path="/dashboard/profile"
                        />
                        <Route
                            exact
                            component={SavedItems}
                            path="/dashboard/profile/bookmarks"
                        />
                        <Route
                            exact
                            component={Notifications}
                            path="/dashboard/notifications"
                        />
                        <Route
                            exact
                            component={ProfileView}
                            path="/users/:id"
                        />
                        {/* <Route component={NotFound} path='*' /> */}
                    </Switch>
                </ApolloProvider>
            </BrowserRouter>
        </>
    );
}
