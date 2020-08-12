import * as React from 'react';
import styled from 'styled-components';
import colorScheme from '../colorScheme';

interface PanelProps {
  children: React.ReactElement;
  title: string;
}

interface PanelState {

}

export const PanelContainer = styled.div`
background: ${colorScheme.background};
  box-shadow: 0px 0px 5px ${colorScheme.shadow};
  overflow: hidden;
  border-radius: 5px 5px 0px 0px;
`;

export const PanelTitle = styled.div`
  background: ${colorScheme.light};
  box-shadow: 0px 0px 5px ${colorScheme.shadow};
  padding: 1em;

`;

export const PanelContent = styled.div`
  display: block;
  transform-origin: 50% 0%;
  ${props => props.hidden ? 'max-height: 0em;' : 'max-height: 20em;'}
  transition: max-height ease-out 1.5s;
  overflow: hidden;
`;

class Panel extends React.Component<PanelProps, PanelState> {
  public constructor(props: PanelProps) {
    super(props);
  }

  public render() {
    return (
      <PanelContainer>
        <PanelTitle>{this.props.title}</PanelTitle>
        <PanelContent>{
          this.props.children
        }</PanelContent>
      </PanelContainer>
    );
  }
}

export default Panel;