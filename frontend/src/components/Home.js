import React, {Component} from 'react';
import ProceduresList from './ProceduresList';
import {Divider} from 'semantic-ui-react';

class Home extends Component {
  render() {
    return (
      <div>
        <Divider />
        home
        <ProceduresList {...this.props} />
      </div>
    )
  }
}

export default Home;
