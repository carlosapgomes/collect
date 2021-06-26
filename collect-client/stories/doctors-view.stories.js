import { html } from 'lit-html';
import '../src/doctors-view.js';

export default {
  title: 'DoctorsView',
  component: 'doctors-view',
  argTypes: {},
};

function Template() {
  return html` <doctors-view> </doctors-view> `;
}

export const App = Template.bind({});
App.args = {
  title: 'DoctorsView',
};
