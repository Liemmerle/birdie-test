import * as React from 'react';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Logo from '../Logo';
import styled from 'styled-components';
import DailyPanel from './DailyPanel';
import colorScheme from '../colorScheme';
import Button from '../Button';

const LogoUrl = require('../../assets/images/logo-birdie.svg');

interface DashboardProps {
  careRecipient: { name: string, id: string } | null;
}

interface DashboardState {
  date: Date;
}

const DashboardContainer = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  overflow-y: hidden;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
`;

const DailyPanelContainer = styled.div`
  flex-grow: 1;
  display: flex;
  overflow-y: scroll;
  justify-content: center;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: wrap;
`;

const NavBar = styled.div`
  padding: 1em;
  background: ${colorScheme['primary-variant']};
`;

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  public constructor(props: DashboardProps) {
    super(props);

    let date = new Date(2019, 3, 27);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    this.state = {
      date: date
    };
  }

  public render() {
    let previousWeekDate = new Date(this.state.date);
    previousWeekDate.setDate(previousWeekDate.getDate() - 6);

    return (
      <DashboardContainer>
        {
          this.props.careRecipient ? (
            <>
              <NavBar>
                <Button
                  onClick={() => {
                    let newDate = new Date(this.state.date);
                    newDate.setDate(newDate.getDate() - 7);
                    this.setState({ date: newDate });
                  }}
                >
                  {'<-'}
                </Button>
                {previousWeekDate.toDateString() + ' - ' + this.state.date.toDateString()}
                <Button
                  onClick={() => {
                    let newDate = new Date(this.state.date);
                    newDate.setDate(newDate.getDate() + 7);
                    this.setState({ date: newDate });
                  }}
                >
                  {'->'}
                </Button>
              </NavBar>
              <DailyPanelContainer>
                {[6, 5, 4, 3, 2, 1, 0].map((n: number) => {
                  let date = new Date(this.state.date.getTime());
                  date.setDate(date.getDate() - n);

                  return <DailyPanel date={date} key={n} variant={n % 2 === 0} />;
                })}
              </DailyPanelContainer>
            </>
          ) : (
              <DailyPanelContainer>
                <Logo src={LogoUrl} />
              </DailyPanelContainer>)
        }
      </ DashboardContainer>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  return {
    ...ownProps,
    careRecipient: state.careRecipient,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);