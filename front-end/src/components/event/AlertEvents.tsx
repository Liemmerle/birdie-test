import * as React from 'react';
import { RootState, CareEvent } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import colorScheme from '../colorScheme';
import { setSelectedEvents } from '@App/store/actions/selectEvents';

interface AlertEventsProps {
  top: number;
  events: CareEvent[];
  className?: string;
  setSelectedEvents: (events: CareEvent[]) => void;
}

interface AlertEventsState {

}

class AlertEvents extends React.Component<AlertEventsProps, AlertEventsState> {
  public constructor(props: AlertEventsProps) {
    super(props);
  }

  public render() {
    return (
      <div className={this.props.className} onClick={() => this.props.setSelectedEvents(this.props.events)}>
        <div>
          {new Date(this.props.events[0].timestamp).toTimeString().substring(0, 5)}
        </div>
      </div>
    );
  }
}

const StyledAlertEvents = styled(AlertEvents)`
  top: ${props => props.top}%;
  width: 33%;
  height: 2.08%;
  position: absolute;
  overflow: hidden;
  background: ${colorScheme.alert};
  color: ${colorScheme.text};
	font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
`;

const mapStateToProps = (state: RootState, ownProps: object) => {
  return {

  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    setSelectedEvents: (events: CareEvent[]) => dispatch(setSelectedEvents(events))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StyledAlertEvents);