import { html } from 'lit-html';
import '../src/user-form.js';

export default {
  title: 'UserForm',
  component: 'user-form',
  argTypes: {},
};

function Template(activate) {
  return html`<user-form ?activate=${activate}></user-form>`;
}

export const App = Template.bind({});
App.args = {
  activate: true,
};
