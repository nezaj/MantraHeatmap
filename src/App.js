import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import request from 'superagent';
import './App.css';

const TODAY = new Date();

const styles = {
  graph: {
    marginTop: 10,
    marginBottom: 20,
  },
  graphTitle: {
    textAlign: 'center'
  }
};

class App extends Component {
  state = {
    'data': {}
  }

  componentDidMount() {
    // Load raw data
    const uri = 'https://raw.githubusercontent.com/nezaj/logs/master/daily_output.json'
    request.get(uri)
      .end((err, res) => {
      if (err) { console.log('ERROR loading data from github') }
      this.setState({ data: JSON.parse(res.text) })
    })
  }


  render() {
    if (Object.keys(this.state.data).length === 0) {
      return <div></div>
    } else {
      return (
        <div className="container">
          <div className="row">
            <MantraMap
              styleClass="col-xs-12 col-md-6"
              title="Wake Early"
              values={this.state.data.wake_up} />
            <MantraMap
              styleClass="col-xs-12 col-md-6"
              title="Solid Exercise"
              values={this.state.data.exercise} />
          </div>
          <div className="row">
            <MantraMap
              styleClass="col-xs-12 col-md-6"
              title="Good Work"
              values={this.state.data.good_work} />
            <MantraMap
              styleClass="col-xs-12 col-md-6"
              title="Under 2000"
              values={this.state.data.under_2000} />
          </div>
          <div className="row">
            <MantraMap
              styleClass="col-xs-12 col-md-6 offset-md-3"
              title="Cleans"
              values={this.state.data.cleans} />
          </div>
        </div>
      );
    }
  }
}

const MantraMap = ({styleClass, title, values}) => (
  <div style={styles.graph}>
    <div className={styleClass}>
      <h2 style={styles.graphTitle}>{title}</h2>
        <CalendarHeatmap
          endDate={TODAY}
          numDays={180}
          values={values}
          classForValue={(value) => (
            !value || !value.flag ? 'color-empty' :
              value.flag === 'Y' ? 'color-yes' : 'color-no'
          )}
        />
    </div>
  </div>
)

export default App;
