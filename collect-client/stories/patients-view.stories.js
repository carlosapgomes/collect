import { html } from 'lit-html';
import '../src/patients-view.js';

export default {
  title: 'PatientsView',
  component: 'patients-view',
  argTypes: {},
};

function Template() {
  const patients = [
    {name: 'Patient 1'},
    {name: 'Patient 2'}

  ]
  return html`<patients-view .patients="${patients}"></patients-view>`;
}

export const App = Template.bind({});
App.args = {};

