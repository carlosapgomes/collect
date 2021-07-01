import { html } from 'lit-html';
import '../src/login-form.js';

export default {
  title: 'Login',
  component: 'login-form',
  argTypes: {},
};

function Template() {
  return html`<login-form></login-form>`;
}

export const App = Template.bind({});
App.args = {
  title: 'LoginForm',
};
