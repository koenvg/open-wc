/**
 * @fileoverview Enforce no accesskey attribute on element.
 * @author open-wc
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-access-key');
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
ruleTester.run('no-access-key', rule, {
  valid: [
    { code: 'html`<a></a>`' },
    // give me some code that won't trigger a warning
  ].map(prependLitHtmlImport),

  invalid: [
    {
      code: "html`<a accesskey='j'></a>`",
      errors: [
        {
          message: 'Avoid using the accesskey attribute.',
        },
      ],
    },
    {
      code: "html`<a accesskey='${foo}'></a>`",
      errors: [
        {
          message: 'Avoid using the accesskey attribute.',
        },
      ],
    },
    {
      code: "html`<a accesskey='${'f'}'></a>`",
      errors: [
        {
          message: 'Avoid using the accesskey attribute.',
        },
      ],
    },
  ].map(prependLitHtmlImport),
});
