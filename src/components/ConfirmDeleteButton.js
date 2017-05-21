import React, {Component} from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import Tooltip from 'react-toolbox/lib/tooltip'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'

const TooltipIcon = Tooltip(Icon);

class ConfirmDeleteButton extends Component {
  static propTypes = {
    onDelete: React.PropTypes.func.isRequired,
    tooltip: React.PropTypes.string,
    title: React.PropTypes.string
  }
  state = {
    confirmationPopup: false
  }
  open(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.setState({ confirmationPopup: true })
  }
  close() {
    this.setState({ confirmationPopup: false })
  }
  render() {
    const {tooltip, title} = this.props;
    return (
      <div className="delete-button">
        <TooltipIcon
          tooltip={tooltip || "Borrar"}
          value="clear"
          style={{color: '#757575'}}
          onClick={(ev) => this.open(ev)}
        />
        <Dialog
          active={this.state.confirmationPopup}
          onEscKeyDown={() => this.close()}
          onOverlayClick={() => this.close()}
          title={title || "Confirmar borrado"}
          actions={[
            {label: 'Si', primary: true, onClick: () => {
              this.close();
              this.props.onDelete();
            }},
            {label: 'No', onClick: () => this.close()}
          ]}
        ><p>¿Est&aacute; seguro?</p></Dialog>
      </div>
    );
  }
}

export default ConfirmDeleteButton;
