/**
 * @fileoverview &lt;ing-checkbox&gt; requires an array-like syntax
 * @author open-wc
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/aria-role');
const { prependLitHtmlImport } = require('../../../lib/utils/utils.js');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015,
  },
});

ruleTester.run('aria-role', rule, {
  valid: [
    { code: "html`<div role='alert'></div>`;" },
    { code: "html`<div role='progressbar'></div>`;" },
    { code: "html`<div role='navigation'></div>`;" },
    { code: 'html`<div role="navigation"></div>`;' },
    { code: "html`<div role=${'navigation'}></div>`;" },
    { code: 'html`<div role="${\'navigation\'}"></div>`;' },
    { code: 'html`<div role=\'${"navigation"}\'></div>`;' },
    { code: "html`<div role='${foo}'></div>`;" },
    { code: 'html`<div role=${foo}></div>`;' },
    { code: 'html`<div></div>`;' },
  ].map(prependLitHtmlImport),

  invalid: [
    {
      code: "html`<div role='foo'>`;",
      errors: [{ message: 'Invalid role "foo".' }],
    },
    {
      code: 'html`<div role="foo">`;',
      errors: [{ message: 'Invalid role "foo".' }],
    },
  ].map(prependLitHtmlImport),
});
