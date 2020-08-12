import * as React from 'react';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';

import { CareEvent } from '@App/store/reducers/index';
import { fetchEvents } from '@App/store/actions/events';
import VisitEvents from '../event/VisitEvents';
import AlertEvents from '../event/AlertEvents';
import colorScheme from '../colorScheme';

interface DailyPanelProps {
  careRecipient: { name: string, id: string };
  date: Date;
  events: CareEvent[] | null;
  className?: string;
  variant?: boolean;
  getEvents: (date: Date, careRecipient: string) => void;
}

interface DailyPanelState {

}

const DateContainer = styled.div`
  padding: 1em;
  background-image:
    repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
    repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
  background-size: 100% 100%;
`;

const EventsContainer = styled.div`
  overflow: hidden;
  width: 100%
  flex-grow: 1;
  background-image:
    repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
    repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
  background-size: 100% 4.167%;
  position: relative;
`;

class DailyPanel extends React.Component<DailyPanelProps, DailyPanelState> {
  public constructor(props: DailyPanelProps) {
    super(props);
  }

  public componentDidMount() {
    if (!this.props.events) {
      this.props.getEvents(this.props.date, this.props.careRecipient.id);
    }
  }

  public componentDidUpdate() {
    if (!this.props.events) {
      this.props.getEvents(this.props.date, this.props.careRecipient.id);
    }
  }

  public render() {
    let endDayDate = new Date(this.props.date);
    endDayDate.setDate(endDayDate.getDate() + 1);

    let visits;
    let alerts;

    if (this.props.events) {
      visits = this.props.events.filter(ev => ev.event_type === 'check_in')
        // group elements by visits
        .reduce<CareEvent[][]>(
          (prev, ev) => {
            prev.push(this.props.events!.filter(ev2 => ev2.visit_id === ev.visit_id)!);
            return prev;
          },
          [])
        // merges visits if they overlaps
        .reduce<CareEvent[][]>(
          (prev, visit) => {
            if (prev.length === 0) {
              prev.push(visit);
            } else {
              let last = prev[prev.length - 1];
              if (new Date(last[last.length - 1].timestamp).getTime() > new Date(visit[0].timestamp).getTime()) {
                prev[prev.length - 1] = last.concat(visit)
                  .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
              } else {
                prev.push(visit);
              }
            }
            return prev;
          },
          [])
        // generate <VisitEvents> objects
        .map(visit => {
          let startDate = new Date(visit[0].timestamp).getTime();
          let endDate = new Date(visit[visit.length - 1].timestamp).getTime();

          return (
            <VisitEvents
              top={
                100 * (startDate - this.props.date.getTime())
                / (endDayDate.getTime() - this.props.date.getTime())
              }
              height={
                100 * (endDate - startDate)
                / (endDayDate.getTime() - this.props.date.getTime())
              }
              events={visit}
              key={visit[0].id}
            />
          );
        });

      // select alerts and events outside all visits
      alerts = this.props.events.filter(
        ev => ev.alert_id !== null)
        .map(alertEv => {
          return this.props.events!.find(ev => ev.id === alertEv.observation_event_id)!;
        })
        .reduce<CareEvent[][]>(
          (prev, cur) => {
            if (prev.length === 0) {
              prev[0] = [cur];
            } else {
              let deltaDate = new Date(prev[prev.length - 1][0].timestamp).getTime()
                - new Date(cur.timestamp).getTime();

              if (-deltaDate < 1800000) {
                prev[prev.length - 1].push(cur);
              } else {
                prev.push([cur]);
              }
            }
            return prev;
          },
          [])
        .map(evList => (
          <AlertEvents
            top={100 * (new Date(evList[0].timestamp).getTime() - this.props.date.getTime())
              / (endDayDate.getTime() - this.props.date.getTime())}
            events={evList}
            key={evList[0].id}
          />
        ));
    }

    return (
      <div className={this.props.className}>
        <DateContainer>{this.props.date.toDateString()}</DateContainer>
        <EventsContainer>

          {visits}
          {alerts}
        </EventsContainer>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object & { date: Date }) => {
  return {
    ...ownProps,
    careRecipient: state.careRecipient,
    events: state.careRecipient ?
      state.events[state.careRecipient.id]
        ? state.events[state.careRecipient.id][ownProps.date.toISOString()] || null
        : null : null
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getEvents: (date: Date, careRecipient: string) => dispatch(fetchEvents(careRecipient, date)),
  };
};

const StyledDailyPanel = styled(DailyPanel)`
  height: 200%;
  width: 14%;
  background-color: ${props => props.variant ? colorScheme['light-accent'] : colorScheme.light}
  display: flex;
  flex-direction: column;
`;

export default connect(mapStateToProps, mapDispatchToProps)(StyledDailyPanel);