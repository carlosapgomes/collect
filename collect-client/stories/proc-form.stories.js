import { html } from 'lit-html';
import '../src/proc-form.js';

export default {
  title: 'ProcForm',
  component: 'proc-form',
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
  return html`<proc-form .users=${users} ?activate=${activate}></proc-form>`;
}

export const App = Template.bind({});
App.args = {
  activate: true,
};
