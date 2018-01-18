import React, {Component} from 'react'
import { renderAsyncSelect as AsyncSelect } from '../../shared/FormFields';
import { searchUsers } from 'services/selectHelpers'
import styled from 'styled-components';
import {connect} from 'react-redux'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  .select-icon {
    line-height: 60px;
    padding: 12px;
    padding-bottom: 0;
  }
  .select-container {
    min-width: 230px;
  }
`;

class Dashboard extends Component {
  state = {
    selectedUser: {}
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.selectedUser.value !== this.state.selectedUser.value) {
      this.setState({selectedUser: nextProps.selectedUser})
    }
  }
  render() {
    const loading = true;
    const searchInputProps = {
      value: this.state.selectedUser,
      onChange: (selectedUser) => this.setState({selectedUser})
    }
    return  (
      <div className="list-container">
        <div className="list-title-container">
          <Header>
            <h2 className="list-title">Reportes</h2>
            {this.props.isAdmin && (
              <AsyncSelect
                name="user"
                icon="person"
                label="Usuario"
                className="select"
                placeholder="Escribe para buscar"
                loadOptions={searchUsers}
                input={searchInputProps}
                meta={{}}
              />
            )}
          </Header>
          {loading && <p className="color-primary">Cargando ... </p>}
        </div>
      </div>
    )
  }
}

export default connect(
  (state, props) => {
    return {
      isAdmin: state.auth.roles.indexOf("ADMIN") !== -1,
      selectedUser: {
        label: state.auth.full_name,
        value: state.auth._id
      }
    }
  }
)(Dashboard)
