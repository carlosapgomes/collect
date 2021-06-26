import { html } from 'lit-html';
import '../src/procs-view.js';

export default {
  title: 'ProcsView',
  component: 'procs-view',
  argTypes: {},
};

function Template() {
  return html` <procs-view> </procs-view> `;
}

export const App = Template.bind({});
App.args = {
  title: 'ProcsView',
};
