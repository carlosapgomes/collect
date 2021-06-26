import { html } from 'lit-html';
import '../src/doctor-form.js';

export default {
  title: 'DoctorForm',
  component: 'doctor-form',
  argTypes: {},
};

function Template(activate) {
  return html`<doctor-form ?activate=${activate}></doctor-form>`;
}

export const App = Template.bind({});
App.args = {
  activate: true,
};
