import { html } from 'lit-html';
import '../src/procs-view.js';

export default {
  title: 'ProcsView',
  component: 'procs-view',
  argTypes: {},
};

function Template() {
  const procs = [
    {
      descr: "procedure 1",
      ptName: "Patient Name 1",
      docName: "Doctor Name 1",
      procDateTime: Date('now'),
    },
    {
      descr: "procedure 2",
      ptName: "Patient Name 2",
      docName: "Doctor Name 2",
      procDateTime: Date('now'),
    },
  ];
  return html` <procs-view .procedures="${procs}"> </procs-view> `;
}

export const App = Template.bind({});
App.args = {
  title: 'ProcsView',
};
