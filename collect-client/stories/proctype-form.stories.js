import { html } from 'lit-html';
import '../src/proctype-form.js';

export default {
  title: 'ProcTypeForm',
  component: 'proctype-form',
  argTypes: {},
};

function Template(activate) {
  return html`<proctype-form ?activate=${activate}></proctype-form>`;
}

export const App = Template.bind({});
App.args = {
  activate: true,
};
