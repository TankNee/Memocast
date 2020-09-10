const html2markdown = require('./html2markdown')
const htmlParser = require('./markdown_html_parser')

module.exports = function(html, opts) {
  opts = opts || {};
  opts.parser = htmlParser;
  return html2markdown(html, opts);
};
