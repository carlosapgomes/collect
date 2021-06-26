import { html } from 'lit-html';
import '../src/proctypes-view.js';

export default {
  title: 'ProcTypesView',
  component: 'proctypes-view',
  argTypes: {},
};

function Template() {
  return html` <proctypes-view> </proctypes-view> `;
}

export const App = Template.bind({});
App.args = {
  title: 'ProcTypesView',
};
