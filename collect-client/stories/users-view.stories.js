import { html } from 'lit-html';
import '../src/users-view.js';

export default {
  title: 'UsersView',
  component: 'users-view',
  argTypes: {
    users: {
      type: 'array',
    },
  },
};

function Template() {
  const users = [
    {
      name: 'user1',
      email: 'user1@test',
    },
    {
      name: 'user',
      email: 'user1@test',
    },
  ];
  return html`<users-view .users="${users}"></users-view>`;
}

export const App = Template.bind({});
App.args = {};
