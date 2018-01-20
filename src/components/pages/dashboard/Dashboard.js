import React, {Component} from 'react'
import { 
  renderAsyncSelect as AsyncSelect,
  renderDatepicker as Datepicker
} from '../../shared/FormFields';
import { searchUsers } from 'services/selectHelpers'
import styled from 'styled-components';
import {connect} from 'react-redux'
import axios from 'services/axiosWrapper';
import moment from 'moment';
import { groupBy } from 'lodash';
import BarChart from '../../shared/BarChart';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 1rem;
  .select-icon {
    line-height: 60px;
    padding: 12px;
    padding-bottom: 0;
  }
  .select-container {
    min-width: 265px;
  }
`;
const DateSelector = styled.section`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  .select-icon {
    line-height: 60px;
    padding: 12px;
    padding-bottom: 0;
    + div {
      width: 150px;
    }
  }
`;

class Dashboard extends Component {
  state = {
    loading: true,
    times: [],
    chartData: [],
    selectedUser: {},
    startDate: moment().startOf('week').toDate(),
    endDate: moment().endOf('week').toDate()
  }
  componentWillReceiveProps(nextProps) {
    if(!this.state.selectedUser.value && !!nextProps.selectedUser.value) {
      this.setState({selectedUser: nextProps.selectedUser}, () => {
        this.fetchTimes();
      })
    }
  }
  fetchTimes() {
    this.setState({loading: true})
    const params = {
      userId: this.state.selectedUser.value,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }
    const url = `/time/by_project`;
    axios.get(url, {params})
    .then(res => res.data)
    .then(times => {
      this.setState({
        loading: false, 
        times,
        chartData: this.getChartData(times)
      });
    })
  }
  handleFilterChange(key) {
    return value => {
      this.setState({ [key]: value }, () => {
        this.fetchTimes();
      })
    }
  }
  getChartData(times) {
    if(!times.length) {
      return [];
    }
    const {startDate, endDate} = this.state;
    return times.map(group => {
      const projectName = group.times[0].project.name
      const timesByDay = groupBy(group.times, time => (
        moment(time.startTime).format('YYYY-MM-DD')
      ))
      // substract start time from end time to obtain pairs of day and total time
      const values = Object.keys(timesByDay).map(day => {
        const times = timesByDay[day];
        const totalTime = times.map(t => (
          moment(t.endTime).diff(t.startTime, 'seconds')
        )).reduce((prev, next) => prev + next)
        return { day, totalTime }
      })
      // make a numeric range with the date range selected
      const rangeLength = moment(endDate).diff(startDate, 'days');
      const range = Array.from({length: rangeLength}, (_, index) => index);
      // iterate through numeric range checking and filling values 
      // and making sure we have a value for every day in the date range
      let valueIndex = 0;
      const filledValues = range.map(days => {
        const start = moment(startDate).add(days, 'days');
        const voidValue =  {
          day: start.format('YYYY-MM-DD'),
          totalTime: 0
        }
        const value = values[valueIndex];
        if(!value) {
          return voidValue;
        }
        const valueMoment = moment(value.day, 'YYYY-MM-DD');
        if(start.isSame(valueMoment, 'days')) {
          valueIndex++;
          return value
        }
        return voidValue;
      })
      return {
        projectName, 
        values: filledValues
      }
    })
  }
  render() {
    const searchInputProps = {
      value: this.state.selectedUser,
      onChange: this.handleFilterChange('selectedUser')
    }
    const {
      startDate,
      endDate,
      chartData,
      loading
    } = this.state;
    return  (
      <div className="list-container">
        <h2 className="list-title">Reportes</h2>
        <DateSelector>
          {loading && (
            <p className="color-primary">
              <strong>Cargando ...</strong> 
            </p>
          )}
          <div style={{flex: 1}}></div>
          <Datepicker 
            name="startDate"
            input={{
              value: startDate,
              onChange: this.handleFilterChange('startDate')
            }}
            label="Desde"
            icon="date_range"
            locale="es"
            autoOk
          />
          <Datepicker 
            name="endDate"
            input={{
              value: endDate,
              onChange: this.handleFilterChange('endDate')
            }}
            label="Hasta"
            locale="es"
            autoOk
          />
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
        </DateSelector>
        {!loading && chartData.length === 0  && (
          <p style={{
            textAlign: 'center',
            marginTop: '1em',
            fontSize: '20px'
          }}>
            Este usuario no tiene ningun tiempo registrado en este rango de fechas
          </p>
        )}
        <BarChart data={chartData} />
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
