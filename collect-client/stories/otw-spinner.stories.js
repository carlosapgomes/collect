import { html } from 'lit-html';
import '../src/otw-spinner.js';

export default {
  title: 'Spinner',
  component: 'otw-spinner',
  argTypes: {},
};

function Template() {
  return html`<otw-spinner></otw-spinner>`;
}

export const App = Template.bind({});
App.args = {};
