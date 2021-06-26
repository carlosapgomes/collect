import { html } from 'lit-html';
import '../src/users-view.js';

export default {
  title: 'UsersView',
  component: 'users-view',
  argTypes: {},
};

function Template() {
  return html`<users-view></users-view>`;
}

export const App = Template.bind({});
App.args = {};
