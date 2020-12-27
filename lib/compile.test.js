import Chai from 'chai';
import * as h from '@robinblomberg/html-ast';
import { compile } from './compile.js';

describe('compile', () => {
  describe('Document', () => {
    it('', () => {
      Chai.assert.strictEqual(
        compile(
          h.document()
        ),
        ''
      );
    });

    it('<!DOCTYPE html><html></html>', () => {
      Chai.assert.strictEqual(
        compile(
          h.document([
            h.doctype(),
            h.html()
          ])
        ),
        '<!DOCTYPE html><html></html>'
      );
    });
  });

  describe('DocumentType', () => {
    it('<!DOCTYPE html>', () => {
      Chai.assert.strictEqual(
        compile(
          h.doctype()
        ),
        '<!DOCTYPE html>'
      );
    });

    it('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" ' +
      '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">', () => {
      Chai.assert.strictEqual(
        compile(
          h.doctype(
            'html',
            '-//W3C//DTD XHTML 1.0 Transitional//EN',
            'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'
          )
        ),
        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" ' +
        '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
      );
    });
  });

  describe('Element', () => {
    it('<div></div>', () => {
      Chai.assert.strictEqual(
        compile(
          h.div()
        ),
        '<div></div>'
      );
    });

    it('<meta>', () => {
      Chai.assert.strictEqual(
        compile(
          h.meta()
        ),
        '<meta>'
      );
    });

    it('<button disabled></button>', () => {
      Chai.assert.strictEqual(
        compile(
          h.button({ disabled: true })
        ),
        '<button disabled></button>'
      );
    });

    it('<i class="fa fa-heart"></i>', () => {
      Chai.assert.strictEqual(
        compile(
          h.i({ class: ['fa', 'fa-heart'] })
        ),
        '<i class="fa fa-heart"></i>'
      );
    });

    it('<table><tr><th>FirstName</th><th>LastName</th></tr></table>', () => {
      Chai.assert.strictEqual(
        compile(
          h.table([
            h.tr([
              h.th('FirstName'),
              h.th('LastName')
            ])
          ])
        ),
        '<table><tr><th>FirstName</th><th>LastName</th></tr></table>'
      );
    });
  });

  describe('Text', () => {
    it('', () => {
      Chai.assert.strictEqual(
        compile(
          h.text()
        ),
        ''
      );
    });

    it('Hello world!', () => {
      Chai.assert.strictEqual(
        compile(
          h.text('Hello world!')
        ),
        'Hello world!'
      );
    });
  });

  describe('Unknown node', () => {
    it('should throw an error', () => {
      Chai.assert.throws(() => {
        compile(/** @type {any} */ ({ type: 'Unknown' }));
      });
    });
  });
});
