import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Header, Container} from 'semantic-ui-react';

class Main extends Component {
  render() {
    return (
      <Container>
        <Header as="h1" textAlign="center">
          <Link to="/">Collect</Link>
        </Header>
        {React.cloneElement(this.props.children, this.props)}
      </Container>

    )
  }
}

export default Main;
