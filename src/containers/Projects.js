import React, {Component} from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import TaskQuickAccess from '../components/taskQuickAccess/TaskQuickAccess'
import ShowOnMedia from '../components/ShowOnMedia'
import { connect } from 'react-redux'
import { fetchProjects } from '../reducers/projects.reducer'

class Projects extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProjects());
  }
  parsePercent(percent) {
    percent = parseFloat(percent) || 0;
    const num = (percent * 100).toFixed(2)
    return `${num} %`;
  }
  render() {
    const {projects, loading} = this.props;
    return (
      <div className="projects"
           style={{padding: ".5em"}}>
        <h2 style={{margin: "1rem"}}>Proyectos</h2>
        <ShowOnMedia mediaKey="small">
          <section style={{flex: 1, marginRight: '2px', marginBottom: '.5rem'}}>
            <p style={{display: 'flex', margin: '.75rem 0'}} >
              <Icon className="task-cards-star">star</Icon>
              Tareas destacadas
            </p>
            <TaskQuickAccess />
          </section>
        </ShowOnMedia>
        {loading && <p className="color-teal">Cargando ... </p>}
        <ul style={{listStyle: 'none'}}>
          <li>
            {projects.map((project, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <p>{project.name}</p>
                <p>{this.parsePercent(project.completedEstimated)}</p>
              </div>
            ))}
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.projects.data,
  loading: state.projects.loading
});

export default connect(mapStateToProps)(Projects);
