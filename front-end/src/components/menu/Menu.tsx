import * as React from 'react';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setCareRecipient } from '@App/store/actions/careRecipient';
import { FETCH_CARE_RECIPIENTS } from '@App/store/sagas/types';
import styled from 'styled-components';
import Button from '../Button';
import colorScheme from '../colorScheme';
import Logo from '../Logo';

const LogoUrl = require('../../assets/images/logo-birdie.svg');

interface MenuProps {
  careRecipient: { name: string, id: string } | null;
  careRecipients: { name: string, id: string }[] | null;
  setCareRecipient: (careRecipient: { name: string, id: string }) => void;
  getCareRecipients: () => void;
}

interface MenuState {

}

const MenuContainer = styled.div`
  width: 15em;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  background-color:  ${colorScheme.light};
  box-shadow: 0px 0px 5px ${colorScheme.shadow};
`;

class Menu extends React.Component<MenuProps, MenuState> {
  public constructor(props: MenuProps) {
    super(props);
    props.getCareRecipients();
  }

  public render() {
    return (
      <MenuContainer>
        <div style={{ margin: '20px' }}>
          <Logo src={LogoUrl} />
        </div>
        {
          this.props.careRecipients ? this.props.careRecipients.map(careRecipient => (
            <Button
              style={{ width: '80%' }}
              onClick={() => { this.props.setCareRecipient(careRecipient); }}
            >
              {careRecipient.name}
            </Button>)) : []
        }
      </ MenuContainer >
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  return {
    ...ownProps,
    careRecipient: state.careRecipient,
    careRecipients: state.careRecipients,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    setCareRecipient: (careRecipient: { name: string, id: string }) => dispatch(setCareRecipient(careRecipient)),
    getCareRecipients: () => dispatch({ type: FETCH_CARE_RECIPIENTS })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);