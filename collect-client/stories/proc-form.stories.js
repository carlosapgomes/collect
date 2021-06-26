import { html } from 'lit-html';
import '../src/proc-form.js';

export default {
  title: 'ProcForm',
  component: 'proc-form',
  argTypes: {},
};

function Template(activate) {
  return html`<proc-form ?activate=${activate}></proc-form>`;
}

export const App = Template.bind({});
App.args = {
  activate: true,
};
