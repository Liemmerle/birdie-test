import * as React from 'react';
import styled from 'styled-components';
import colorScheme from '../colorScheme';

interface EventEntryProps {
  children: React.ReactNode;
  className?: string;
  variant?: boolean;
}

interface EventEntryState {

}

class EventEntry extends React.Component<EventEntryProps, EventEntryState> {
  public constructor(props: EventEntryProps) {
    super(props);
  }

  public render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

const StyledEventEntry = styled(EventEntry)`
  background: ${props => props.variant ? colorScheme.light : colorScheme['light-accent']};
  padding: 1em;
`;

export default StyledEventEntry;