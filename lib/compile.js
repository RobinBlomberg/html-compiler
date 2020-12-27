import { AST, VoidTagNameSet } from '@robinblomberg/html-ast';

/**
 * @param {AST.Node} node
 * @return {string}
 */
export const compile = (node) => {
  switch (node.type) {
    case 'Document': {
      let html = '';

      for (const childNode of node.childNodes) {
        html += compile(childNode);
      }

      return html;
    }
    case 'DocumentType': {
      let html = `<!DOCTYPE ${node.name}`;

      if (node.publicId) {
        html += ` PUBLIC "${node.publicId}"`;
      }

      if (node.systemId) {
        html += ` "${node.systemId}"`;
      }

      html += '>';

      return html;
    }
    case 'Element': {
      let html = `<${node.tagName}`;

      for (const name in node.attributes) {
        if (Object.prototype.hasOwnProperty.call(node.attributes, name)) {
          html += ` ${name}`;

          if (node.attributes[name]) {
            html += `=${JSON.stringify(node.attributes[name])}`;
          }
        }
      }

      html += '>';

      if (!VoidTagNameSet.has(node.tagName)) {
        for (const childNode of node.childNodes) {
          html += compile(childNode);
        }

        html += `</${node.tagName}>`;
      }

      return html;
    }
    case 'Text': {
      return node.data;
    }
    default: {
      throw new TypeError(`Unexpected node type: ${/** @type {any} */ (node).type}`);
    }
  }
};
