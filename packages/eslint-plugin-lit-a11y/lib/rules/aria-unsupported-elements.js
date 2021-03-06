/**
 * @fileoverview
 * @author open-wc
 */

const { TemplateAnalyzer } = require('../../template-analyzer/template-analyzer.js');
const { isHtmlTaggedTemplate } = require('../utils/isLitHtmlTemplate.js');
const { hasLitHtmlImport, createValidLitHtmlSources } = require('../utils/utils.js');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const UNSUPPORTED_ELEMENTS = ['meta', 'script', 'style'];

/** @type {import("eslint").Rule.RuleModule} */
const AriaUnsupportedElementsRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Certain reserved DOM elements do not support ARIA roles, states and properties.',
      category: 'Accessibility',
      recommended: false,
      url:
        'https://github.com/open-wc/open-wc/blob/master/packages/eslint-plugin-lit-a11y/docs/rules/aria-unsupported-elements.md',
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    let isLitHtml = false;
    const validLitHtmlSources = createValidLitHtmlSources(context);

    return {
      ImportDeclaration(node) {
        if (hasLitHtmlImport(node, validLitHtmlSources)) {
          isLitHtml = true;
        }
      },
      TaggedTemplateExpression(node) {
        if (isHtmlTaggedTemplate(node) && isLitHtml) {
          const analyzer = TemplateAnalyzer.create(node);

          analyzer.traverse({
            enterElement(element) {
              if (UNSUPPORTED_ELEMENTS.includes(element.name)) {
                for (const attr of Object.keys(element.attribs)) {
                  if (attr.startsWith('aria-') || attr === 'role') {
                    const loc = analyzer.getLocationForAttribute(element, attr);
                    context.report({
                      loc,
                      message: `<{{tagName}}> element does not support ARIA roles, states, or properties.`,
                      data: {
                        tagName: element.name,
                      },
                    });
                  }
                }
              }
            },
          });
        }
      },
    };
  },
};

module.exports = AriaUnsupportedElementsRule;
