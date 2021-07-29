import { html } from 'lit-html';
import '../src/page-nav.js';

export default {
  title: 'PageNav',
  component: 'page-nav',
  argTypes: {},
};

function Template() {
  return html` <div class="section">
    <page-nav .total=${58} .limit=${10} .skip=${20}></page-nav>
  </div>`;
}

export const App = Template.bind({});
App.args = {};

// <page-nav .total=${ 58 } .limit=${ 10 } .skip=${ 20 }></page-nav>
// <page-nav></page-nav>
