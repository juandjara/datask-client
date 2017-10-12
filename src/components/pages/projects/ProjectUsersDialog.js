import React from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import { browserHistory } from 'react-router'
import ProjectUsers from './ProjectUsers'

const ProjectUsersDialog = (props) => {
  return (
    <Dialog
      active={true}
      className="edit-dialog"
      onEscKeyDown={() => browserHistory.push('/projects')}
      onOverlayClick={() => browserHistory.push('/projects')}
    >
      <ProjectUsers routeParams={props.routeParams} />
    </Dialog>
  );
}

export default ProjectUsersDialog;