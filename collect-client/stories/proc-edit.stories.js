import { html } from 'lit-html';
import '../src/proc-edit.js';

export default {
  title: 'ProcEdit',
  component: 'proc-edit',
  argTypes: {},
};

function Template(activate) {
  const users = [
    {
      name: 'user1',
      id: 'id1',
      licenceNumber: '1111',
      profBoardName: 'crm',
    },
    {
      name: 'user2',
      id: 'id2',
      licenceNumber: '2222',
      profBoardName: 'crm',
    },
  ];
  return html`<proc-edit .users=${users} ?activate=${activate}></proc-edit>`;
}

export const App = Template.bind({});
App.args = {
  activate: true,
};
