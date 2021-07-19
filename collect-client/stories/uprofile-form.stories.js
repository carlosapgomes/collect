import { html } from 'lit-html';
import '../src/uprofile-form.js';

export default {
  title: 'UserProfileForm',
  component: 'uprofile-form',
  argTypes: {},
};

function Template(activate) {
  return html`<uprofile-form ?activate=${activate}></uprofile-form>`;
}

export const App = Template.bind({});
App.args = {
  activate: true,
};

