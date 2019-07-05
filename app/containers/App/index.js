/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React,{useEffect,memo} from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {makeSelectIsAuthorization} from './selectors';
import {setAuthorizationToken} from './actions';
import {getFromStore} from '../../utils/localstorage';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
//custom
import SideBar from 'containers/SideBar/Loadable';
import Navbar from 'containers/Navbar/Loadable';
import CustomFooter from 'containers/CustomFooter/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import Login from 'containers/Login/Loadable';
import Signup from 'containers/Signup/Loadable';
import ViewUsers from 'containers/ViewUsers/Loadable';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(100% + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

  function App(props) {
  
    useEffect(() => {
      let getAuthorizationTokenToLocalstorage = getFromStore("isAuthorization");

      if (getAuthorizationTokenToLocalstorage) {
        props.setAuthorToken(getAuthorizationTokenToLocalstorage);
      }
    }, [props.isAuthorization]);

  return (
    <div>
      <SideBar />
       <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AppWrapper>
              <Helmet
                titleTemplate="%s - React.js Boilerplate"
                defaultTitle="React.js Boilerplate"
              >
                <meta name="description" content="A React.js Boilerplate application" />
              </Helmet>
              {/* <Header /> */}
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/viewUsers" component={ViewUsers} />
                <Route path="/features" component={FeaturePage} />
                <Route path="" component={NotFoundPage} />
              </Switch>
              {/* <Footer /> */}
              <GlobalStyle />
            </AppWrapper>
          </div>
        </div>
      </div>
      <CustomFooter />
    </div>
  );
}


const mapStateToProps = createStructuredSelector({
  isAuthorization: makeSelectIsAuthorization(),
});

function mapDispatchToProps(dispatch) {
  return {
    setAuthorToken: value => dispatch(setAuthorizationToken(value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  withConnect,
  memo,
)(App);
