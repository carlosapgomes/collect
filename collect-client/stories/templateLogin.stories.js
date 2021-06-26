import { html } from 'lit-html';
import { templateLogin } from '../src/templateLogin.js';

export default {
  title: 'Login',
  component: 'main',
  argTypes: {},
};

function Template() {
  return html`<section>${templateLogin}</section>`;
}

export const App = Template.bind({});
App.args = {};
