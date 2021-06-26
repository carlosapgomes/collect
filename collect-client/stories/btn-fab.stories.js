import { html } from 'lit-html';
import '../src/btn-fab.js';

export default {
  title: 'ButtonFab',
  component: 'btn-fab',
  argTypes: {},
};

function Template() {
  return html`<btn-fab></btn-fab>`;
}

export const App = Template.bind({});
App.args = {};
