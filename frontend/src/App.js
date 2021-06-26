import './App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from './actions/actionCreators';
import Main from './components/Main';

function mapStateToProps(state) {
  return {
    procedures: state.procedures,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
const App = connect(mapStateToProps, mapDispatchToProps(Main));

export default App;

