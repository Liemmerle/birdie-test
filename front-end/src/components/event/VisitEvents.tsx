import * as React from 'react';
import { RootState, CareEvent } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import colorScheme from '../colorScheme';
import { setSelectedEvents } from '@App/store/actions/selectEvents';

interface VisitEventsProps {
  top: number;
  height: number;
  events: CareEvent[];
  className?: string;
  setSelectedEvents: (events: CareEvent[]) => void;
}

interface VisitEventsState {

}

class VisitEvents extends React.Component<VisitEventsProps, VisitEventsState> {
  public constructor(props: VisitEventsProps) {
    super(props);
  }

  public render() {
    return (
      <div
        className={this.props.className}
        onClick={() => this.props.setSelectedEvents(this.props.events)}
      >
        <div>
          {new Date(this.props.events[0].timestamp).toTimeString().substring(0, 5)}
        </div>
        <div>
          {new Date(this.props.events[this.props.events.length - 1].timestamp).toTimeString().substring(0, 5)}
        </div>
      </div>
    );
  }
}

const StyledVisitEvent = styled(VisitEvents)`
  overflow: hidden;
  height: ${props => props.height}%;
  min-height: 30px;
  top: ${props => props.top}%;
  left: 33%;
  width: 67%;
  position: absolute;
  background: ${colorScheme['primary-variant']};
	font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: end;
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

export default connect(mapStateToProps, mapDispatchToProps)(StyledVisitEvent);