import * as React from 'react';
import { CareEvent } from '@App/store/reducers';
import StyledEventEntry from './EventEntry';

interface EventComponentProps {
  event: CareEvent;
}

interface EventComponentState {

}

// field not shown in the EventComponent
const hiddenFields: string[] = [
  'id',
  'visit_id',
  'timestamp',
  'care_recipient_id',
  'alert_id',
  'task_instance_id',
  'task_schedule_id',
  'task_definition_id',
  'event_type'
];

class EventComponent extends React.Component<EventComponentProps, EventComponentState> {
  public constructor(props: EventComponentProps) {
    super(props);
  }

  public render() {
    let elements = [];

    let b = true;

    for (let k in this.props.event.payload) {
      if (this.props.event.payload[k] !== null) {
        let value = this.props.event.payload[k];
        if (!hiddenFields.find(v => v === k)) {
          elements.push(
            <StyledEventEntry key={k} variant={b = !b}>
              {k.replace(/_/g, ' ')} : {typeof (value) !== 'object' ? JSON.stringify(value) : 'Not implemented Yet'}
            </StyledEventEntry>);
        }
      }
    }

    return (
      <div>
        {elements}
      </div>
    );
  }
}

export default EventComponent;