import { html } from 'lit-html';
import '../src/spinner-loader.js';

export default {
  title: 'Spinner',
  component: 'spinner-loader',
  argTypes: {},
};

function Template() {
  return html`<spinner-loader></spinner-loader>`;
}

export const App = Template.bind({});
App.args = {};
