import * as React from 'react';
import { RootState, CareEvent } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import colorScheme from '../colorScheme';
import Accordion from '../accordion/Acordion';
import { setSelectedEvents } from '@App/store/actions/selectEvents';
import EventComponent from '../event/Event';
import Panel from '../accordion/Panel';

interface ModalProps {
  events: CareEvent[] | null;
  deselectEvents: () => void;
}

interface ModalState {

}

const ModalBackground = styled.div`
  overflow: hidden;
  left: 0%;
  top: 0%;
  width:100vw;
  height: 100vh;
  background-color: ${colorScheme.transluscentDark};
  position: absolute;
  visibility: ${props => props.hidden ? 'hidden' : 'visible'};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalContainer = styled.div`
  width: 80%;
  max-height: 80%;
  background: ${colorScheme.background};
  box-shadow: 0px 0px 5px ${colorScheme.shadow};
  border-radius: 5px;
  padding: 1em;
`;

class Modal extends React.Component<ModalProps, ModalState> {
  public constructor(props: ModalProps) {
    super(props);
  }

  public render() {
    return (
      <ModalBackground {...{ hidden: !this.props.events }} onClick={() => this.props.deselectEvents()}>
        <ModalContainer onClick={(ev) => ev.stopPropagation()}>
          <Accordion>
            {
              this.props.events
                ? this.props.events.map(ev => (
                  <Panel
                    title={ev.event_type.replace(/_/g, ' ') + ' : ' + new Date(ev.timestamp).toTimeString()}
                    key={ev.id}
                  >
                    <EventComponent event={ev} />
                  </Panel>
                ))
                : []
            }
          </Accordion>
        </ModalContainer>
      </ModalBackground>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  return {
    events: state.selectedEvents
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    deselectEvents: () => dispatch(setSelectedEvents(null)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);