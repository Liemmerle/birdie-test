import * as React from 'react';
import styled from 'styled-components';
import colorScheme from '../colorScheme';
import { PanelContainer, PanelTitle, PanelContent } from './Panel';

interface AccordionProps {
  children?: React.ReactElement<{ title: string, children: React.ReactElement }>[]
  | React.ReactElement<{ title: string, children: React.ReactElement }>;
  className?: string;
}

interface AccordionState {
  unfoldedPanel: number;
}

class Accordion extends React.Component<AccordionProps, AccordionState> {
  public constructor(props: AccordionProps) {
    super(props);
    this.state = {
      unfoldedPanel: 1,
    };
  }

  public render() {
    return (
      <div className={this.props.className}>
        {
          this.props.children
            ? isArray(this.props.children)
              ? this.props.children.map((child, i) => (
                <PanelContainer>
                  <PanelTitle
                    onClick={(ev) => { this.setState({ unfoldedPanel: i }); }}
                  >
                    {child.props.title}
                  </PanelTitle>
                  {<PanelContent {...{ hidden: i !== this.state.unfoldedPanel }}>{child.props.children}</PanelContent>}
                </PanelContainer>
              ))
              : this.state.unfoldedPanel === 0 ? (
                <PanelContainer>
                  <PanelTitle>{this.props.children.props.title}</PanelTitle>
                  <PanelContent>
                    {
                      this.props.children.props.children
                    }
                  </PanelContent>
                </PanelContainer>
              ) : []
            : []
        }
      </div>
    );
  }
}

const StyledAccordion = styled(Accordion)`
  background: ${colorScheme.light};
  box-shadow: 0px 0px 5px ${colorScheme.shadow};
  border-radius: 5px;
  overflow-y: scroll;
  height: 100%;
`;

function isArray(
  a: React.ReactElement<{ title: string }>[] | React.ReactElement<{ title: string }>)
  : a is React.ReactElement<{ title: string }>[] {
  return (a as React.ReactElement<{ title: string }>[]).length !== undefined;
}

export default StyledAccordion;