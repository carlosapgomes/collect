import React, {Component} from 'react';

class ProceduresList extends Component {
  constructor(props) {
    super(props);
    this.props.getProcedures();
  }
  render() {
    return (
      <div>
        {this.props.procedires.map((procedure, i) =>
          <div key={i}>{procedure.name}</div>)}
      </div>
    )
  }
}

export default ProceduresList;

