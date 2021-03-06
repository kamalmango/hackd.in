/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ResponderSyntheticEvent
 * @typechecks static-only
 */

'use strict';

var SyntheticEvent = require('./SyntheticEvent');

/**
 * `touchHistory` isn't actually on the native event, but putting it in the
 * interface will ensure that it is cleaned up when pooled/destroyed. The
 * `ResponderEventPlugin` will populate it appropriately.
 */
var ResponderEventInterface = {
  touchHistory: function touchHistory(nativeEvent) {
    return null; // Actually doesn't even look at the native event.
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native event.
 * @extends {SyntheticEvent}
 */
function ResponderSyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(ResponderSyntheticEvent, ResponderEventInterface);

module.exports = ResponderSyntheticEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1Jlc3BvbmRlclN5bnRoZXRpY0V2ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVlBOztBQUVBLElBQUksaUJBQWlCLFFBQVEsa0JBQVIsQ0FBckI7Ozs7Ozs7QUFPQSxJQUFJLDBCQUEwQjtBQUM1QixnQkFBYyxzQkFBVSxXQUFWLEVBQXVCO0FBQ25DLFdBQU8sSUFBUCxDO0FBQ0Q7QUFIMkIsQ0FBOUI7Ozs7Ozs7O0FBWUEsU0FBUyx1QkFBVCxDQUFpQyxjQUFqQyxFQUFpRCxjQUFqRCxFQUFpRSxXQUFqRSxFQUE4RSxpQkFBOUUsRUFBaUc7QUFDL0YsaUJBQWUsSUFBZixDQUFvQixJQUFwQixFQUEwQixjQUExQixFQUEwQyxjQUExQyxFQUEwRCxXQUExRCxFQUF1RSxpQkFBdkU7QUFDRDs7QUFFRCxlQUFlLFlBQWYsQ0FBNEIsdUJBQTVCLEVBQXFELHVCQUFyRDs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsdUJBQWpCIiwiZmlsZSI6IlJlc3BvbmRlclN5bnRoZXRpY0V2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlc3BvbmRlclN5bnRoZXRpY0V2ZW50XG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFN5bnRoZXRpY0V2ZW50ID0gcmVxdWlyZSgnLi9TeW50aGV0aWNFdmVudCcpO1xuXG4vKipcbiAqIGB0b3VjaEhpc3RvcnlgIGlzbid0IGFjdHVhbGx5IG9uIHRoZSBuYXRpdmUgZXZlbnQsIGJ1dCBwdXR0aW5nIGl0IGluIHRoZVxuICogaW50ZXJmYWNlIHdpbGwgZW5zdXJlIHRoYXQgaXQgaXMgY2xlYW5lZCB1cCB3aGVuIHBvb2xlZC9kZXN0cm95ZWQuIFRoZVxuICogYFJlc3BvbmRlckV2ZW50UGx1Z2luYCB3aWxsIHBvcHVsYXRlIGl0IGFwcHJvcHJpYXRlbHkuXG4gKi9cbnZhciBSZXNwb25kZXJFdmVudEludGVyZmFjZSA9IHtcbiAgdG91Y2hIaXN0b3J5OiBmdW5jdGlvbiAobmF0aXZlRXZlbnQpIHtcbiAgICByZXR1cm4gbnVsbDsgLy8gQWN0dWFsbHkgZG9lc24ndCBldmVuIGxvb2sgYXQgdGhlIG5hdGl2ZSBldmVudC5cbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gZGlzcGF0Y2hDb25maWcgQ29uZmlndXJhdGlvbiB1c2VkIHRvIGRpc3BhdGNoIHRoaXMgZXZlbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGlzcGF0Y2hNYXJrZXIgTWFya2VyIGlkZW50aWZ5aW5nIHRoZSBldmVudCB0YXJnZXQuXG4gKiBAcGFyYW0ge29iamVjdH0gbmF0aXZlRXZlbnQgTmF0aXZlIGV2ZW50LlxuICogQGV4dGVuZHMge1N5bnRoZXRpY0V2ZW50fVxuICovXG5mdW5jdGlvbiBSZXNwb25kZXJTeW50aGV0aWNFdmVudChkaXNwYXRjaENvbmZpZywgZGlzcGF0Y2hNYXJrZXIsIG5hdGl2ZUV2ZW50LCBuYXRpdmVFdmVudFRhcmdldCkge1xuICBTeW50aGV0aWNFdmVudC5jYWxsKHRoaXMsIGRpc3BhdGNoQ29uZmlnLCBkaXNwYXRjaE1hcmtlciwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KTtcbn1cblxuU3ludGhldGljRXZlbnQuYXVnbWVudENsYXNzKFJlc3BvbmRlclN5bnRoZXRpY0V2ZW50LCBSZXNwb25kZXJFdmVudEludGVyZmFjZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzcG9uZGVyU3ludGhldGljRXZlbnQ7Il19