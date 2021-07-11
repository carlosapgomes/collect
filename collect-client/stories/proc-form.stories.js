import { html } from 'lit-html';
import '../src/proc-form.js';

export default {
  title: 'ProcForm',
  component: 'proc-form',
  argTypes: {},
};

function Template(activate) {
  const doctors = [
    {
      name: 'doc1',
      id: 'id1',
    },
    {
      name: 'doc2',
      id: 'id2',
    },
  ];
  return html`<proc-form
    .doctors=${doctors}
    ?activate=${activate}
  ></proc-form>`;
}

export const App = Template.bind({});
App.args = {
  activate: true,
};
