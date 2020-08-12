import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Menu from '@App/components/menu/Menu';
import Dashboard from '../dashboard/Dashboard';
import colorScheme from '../colorScheme';
import Modal from '../modal/Modal';

interface AppProps {

}

interface AppState {

}

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    margin: 0px;
    font-family: sans-serif;
    font-size: 18px;
    background-color: ${colorScheme.background};
    overflow: hidden;
    color: ${colorScheme.text};
    > div {
      height: 100%;
    }
  }
`;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: justify;
  align-items: center;
  flex-direction: row;
`;

class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
  }

  public render() {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Menu key="0" />
          <Dashboard />
        </AppContainer>
        <Modal />
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);