/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */

'use strict';

var ReactDOM = require('./ReactDOM');
var ReactDOMServer = require('./ReactDOMServer');
var ReactIsomorphic = require('./ReactIsomorphic');

var assign = require('./Object.assign');
var deprecated = require('./deprecated');

// `version` will be added here by ReactIsomorphic.
var React = {};

assign(React, ReactIsomorphic);

assign(React, {
  // ReactDOM
  findDOMNode: deprecated('findDOMNode', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.findDOMNode),
  render: deprecated('render', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.render),
  unmountComponentAtNode: deprecated('unmountComponentAtNode', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.unmountComponentAtNode),

  // ReactDOMServer
  renderToString: deprecated('renderToString', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToString),
  renderToStaticMarkup: deprecated('renderToStaticMarkup', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToStaticMarkup)
});

React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOM;
React.__SECRET_DOM_SERVER_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOMServer;

module.exports = React;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1JlYWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUEsSUFBSSxXQUFXLFFBQVEsWUFBUixDQUFmO0FBQ0EsSUFBSSxpQkFBaUIsUUFBUSxrQkFBUixDQUFyQjtBQUNBLElBQUksa0JBQWtCLFFBQVEsbUJBQVIsQ0FBdEI7O0FBRUEsSUFBSSxTQUFTLFFBQVEsaUJBQVIsQ0FBYjtBQUNBLElBQUksYUFBYSxRQUFRLGNBQVIsQ0FBakI7OztBQUdBLElBQUksUUFBUSxFQUFaOztBQUVBLE9BQU8sS0FBUCxFQUFjLGVBQWQ7O0FBRUEsT0FBTyxLQUFQLEVBQWM7O0FBRVosZUFBYSxXQUFXLGFBQVgsRUFBMEIsVUFBMUIsRUFBc0MsV0FBdEMsRUFBbUQsUUFBbkQsRUFBNkQsU0FBUyxXQUF0RSxDQUZEO0FBR1osVUFBUSxXQUFXLFFBQVgsRUFBcUIsVUFBckIsRUFBaUMsV0FBakMsRUFBOEMsUUFBOUMsRUFBd0QsU0FBUyxNQUFqRSxDQUhJO0FBSVosMEJBQXdCLFdBQVcsd0JBQVgsRUFBcUMsVUFBckMsRUFBaUQsV0FBakQsRUFBOEQsUUFBOUQsRUFBd0UsU0FBUyxzQkFBakYsQ0FKWjs7O0FBT1osa0JBQWdCLFdBQVcsZ0JBQVgsRUFBNkIsZ0JBQTdCLEVBQStDLGtCQUEvQyxFQUFtRSxjQUFuRSxFQUFtRixlQUFlLGNBQWxHLENBUEo7QUFRWix3QkFBc0IsV0FBVyxzQkFBWCxFQUFtQyxnQkFBbkMsRUFBcUQsa0JBQXJELEVBQXlFLGNBQXpFLEVBQXlGLGVBQWUsb0JBQXhHO0FBUlYsQ0FBZDs7QUFXQSxNQUFNLDRDQUFOLEdBQXFELFFBQXJEO0FBQ0EsTUFBTSxtREFBTixHQUE0RCxjQUE1RDs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsS0FBakIiLCJmaWxlIjoiUmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJy4vUmVhY3RET00nKTtcbnZhciBSZWFjdERPTVNlcnZlciA9IHJlcXVpcmUoJy4vUmVhY3RET01TZXJ2ZXInKTtcbnZhciBSZWFjdElzb21vcnBoaWMgPSByZXF1aXJlKCcuL1JlYWN0SXNvbW9ycGhpYycpO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9PYmplY3QuYXNzaWduJyk7XG52YXIgZGVwcmVjYXRlZCA9IHJlcXVpcmUoJy4vZGVwcmVjYXRlZCcpO1xuXG4vLyBgdmVyc2lvbmAgd2lsbCBiZSBhZGRlZCBoZXJlIGJ5IFJlYWN0SXNvbW9ycGhpYy5cbnZhciBSZWFjdCA9IHt9O1xuXG5hc3NpZ24oUmVhY3QsIFJlYWN0SXNvbW9ycGhpYyk7XG5cbmFzc2lnbihSZWFjdCwge1xuICAvLyBSZWFjdERPTVxuICBmaW5kRE9NTm9kZTogZGVwcmVjYXRlZCgnZmluZERPTU5vZGUnLCAnUmVhY3RET00nLCAncmVhY3QtZG9tJywgUmVhY3RET00sIFJlYWN0RE9NLmZpbmRET01Ob2RlKSxcbiAgcmVuZGVyOiBkZXByZWNhdGVkKCdyZW5kZXInLCAnUmVhY3RET00nLCAncmVhY3QtZG9tJywgUmVhY3RET00sIFJlYWN0RE9NLnJlbmRlciksXG4gIHVubW91bnRDb21wb25lbnRBdE5vZGU6IGRlcHJlY2F0ZWQoJ3VubW91bnRDb21wb25lbnRBdE5vZGUnLCAnUmVhY3RET00nLCAncmVhY3QtZG9tJywgUmVhY3RET00sIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUpLFxuXG4gIC8vIFJlYWN0RE9NU2VydmVyXG4gIHJlbmRlclRvU3RyaW5nOiBkZXByZWNhdGVkKCdyZW5kZXJUb1N0cmluZycsICdSZWFjdERPTVNlcnZlcicsICdyZWFjdC1kb20vc2VydmVyJywgUmVhY3RET01TZXJ2ZXIsIFJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RyaW5nKSxcbiAgcmVuZGVyVG9TdGF0aWNNYXJrdXA6IGRlcHJlY2F0ZWQoJ3JlbmRlclRvU3RhdGljTWFya3VwJywgJ1JlYWN0RE9NU2VydmVyJywgJ3JlYWN0LWRvbS9zZXJ2ZXInLCBSZWFjdERPTVNlcnZlciwgUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdGF0aWNNYXJrdXApXG59KTtcblxuUmVhY3QuX19TRUNSRVRfRE9NX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQgPSBSZWFjdERPTTtcblJlYWN0Ll9fU0VDUkVUX0RPTV9TRVJWRVJfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCA9IFJlYWN0RE9NU2VydmVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0OyJdfQ==