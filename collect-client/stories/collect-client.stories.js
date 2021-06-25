import { html } from 'lit-html';
import '../src/collect-client.js';

export default {
  title: 'CollectClient',
  component: 'collect-client',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <collect-client
      style="--collect-client-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </collect-client>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
