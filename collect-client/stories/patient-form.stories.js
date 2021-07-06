import { html } from 'lit-html';
import '../src/patient-form.js';

export default {
  title: 'PatientForm',
  component: 'patient-form',
  argTypes: {},
};

function Template(activate) {
  return html`<patient-form ?activate=${activate}></patient-form>`;
}

export const App = Template.bind({});
App.args = {
  activate: true,
};

