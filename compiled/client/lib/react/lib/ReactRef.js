/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactRef
 */

'use strict';

var ReactOwner = require('./ReactOwner');

var ReactRef = {};

function attachRef(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(component.getPublicInstance());
  } else {
    // Legacy ref
    ReactOwner.addComponentAsRefTo(component, ref, owner);
  }
}

function detachRef(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(null);
  } else {
    // Legacy ref
    ReactOwner.removeComponentAsRefFrom(component, ref, owner);
  }
}

ReactRef.attachRefs = function (instance, element) {
  if (element === null || element === false) {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    attachRef(ref, instance, element._owner);
  }
};

ReactRef.shouldUpdateRefs = function (prevElement, nextElement) {
  // If either the owner or a `ref` has changed, make sure the newest owner
  // has stored a reference to `this`, and the previous owner (if different)
  // has forgotten the reference to `this`. We use the element instead
  // of the public this.props because the post processing cannot determine
  // a ref. The ref conceptually lives on the element.

  // TODO: Should this even be possible? The owner cannot change because
  // it's forbidden by shouldUpdateReactComponent. The ref can change
  // if you swap the keys of but not the refs. Reconsider where this check
  // is made. It probably belongs where the key checking and
  // instantiateReactComponent is done.

  var prevEmpty = prevElement === null || prevElement === false;
  var nextEmpty = nextElement === null || nextElement === false;

  return(
    // This has a few false positives w/r/t empty components.
    prevEmpty || nextEmpty || nextElement._owner !== prevElement._owner || nextElement.ref !== prevElement.ref
  );
};

ReactRef.detachRefs = function (instance, element) {
  if (element === null || element === false) {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    detachRef(ref, instance, element._owner);
  }
};

module.exports = ReactRef;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1JlYWN0UmVmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUEsSUFBSSxhQUFhLFFBQVEsY0FBUixDQUFqQjs7QUFFQSxJQUFJLFdBQVcsRUFBZjs7QUFFQSxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0IsU0FBeEIsRUFBbUMsS0FBbkMsRUFBMEM7QUFDeEMsTUFBSSxPQUFPLEdBQVAsS0FBZSxVQUFuQixFQUErQjtBQUM3QixRQUFJLFVBQVUsaUJBQVYsRUFBSjtBQUNELEdBRkQsTUFFTzs7QUFFTCxlQUFXLG1CQUFYLENBQStCLFNBQS9CLEVBQTBDLEdBQTFDLEVBQStDLEtBQS9DO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0IsU0FBeEIsRUFBbUMsS0FBbkMsRUFBMEM7QUFDeEMsTUFBSSxPQUFPLEdBQVAsS0FBZSxVQUFuQixFQUErQjtBQUM3QixRQUFJLElBQUo7QUFDRCxHQUZELE1BRU87O0FBRUwsZUFBVyx3QkFBWCxDQUFvQyxTQUFwQyxFQUErQyxHQUEvQyxFQUFvRCxLQUFwRDtBQUNEO0FBQ0Y7O0FBRUQsU0FBUyxVQUFULEdBQXNCLFVBQVUsUUFBVixFQUFvQixPQUFwQixFQUE2QjtBQUNqRCxNQUFJLFlBQVksSUFBWixJQUFvQixZQUFZLEtBQXBDLEVBQTJDO0FBQ3pDO0FBQ0Q7QUFDRCxNQUFJLE1BQU0sUUFBUSxHQUFsQjtBQUNBLE1BQUksT0FBTyxJQUFYLEVBQWlCO0FBQ2YsY0FBVSxHQUFWLEVBQWUsUUFBZixFQUF5QixRQUFRLE1BQWpDO0FBQ0Q7QUFDRixDQVJEOztBQVVBLFNBQVMsZ0JBQVQsR0FBNEIsVUFBVSxXQUFWLEVBQXVCLFdBQXZCLEVBQW9DOzs7Ozs7Ozs7Ozs7O0FBYTlELE1BQUksWUFBWSxnQkFBZ0IsSUFBaEIsSUFBd0IsZ0JBQWdCLEtBQXhEO0FBQ0EsTUFBSSxZQUFZLGdCQUFnQixJQUFoQixJQUF3QixnQkFBZ0IsS0FBeEQ7O0FBRUEsUTs7QUFFRSxpQkFBYSxTQUFiLElBQTBCLFlBQVksTUFBWixLQUF1QixZQUFZLE1BQTdELElBQXVFLFlBQVksR0FBWixLQUFvQixZQUFZO0FBRnpHO0FBSUQsQ0FwQkQ7O0FBc0JBLFNBQVMsVUFBVCxHQUFzQixVQUFVLFFBQVYsRUFBb0IsT0FBcEIsRUFBNkI7QUFDakQsTUFBSSxZQUFZLElBQVosSUFBb0IsWUFBWSxLQUFwQyxFQUEyQztBQUN6QztBQUNEO0FBQ0QsTUFBSSxNQUFNLFFBQVEsR0FBbEI7QUFDQSxNQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUNmLGNBQVUsR0FBVixFQUFlLFFBQWYsRUFBeUIsUUFBUSxNQUFqQztBQUNEO0FBQ0YsQ0FSRDs7QUFVQSxPQUFPLE9BQVAsR0FBaUIsUUFBakIiLCJmaWxlIjoiUmVhY3RSZWYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RSZWZcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdE93bmVyJyk7XG5cbnZhciBSZWFjdFJlZiA9IHt9O1xuXG5mdW5jdGlvbiBhdHRhY2hSZWYocmVmLCBjb21wb25lbnQsIG93bmVyKSB7XG4gIGlmICh0eXBlb2YgcmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmVmKGNvbXBvbmVudC5nZXRQdWJsaWNJbnN0YW5jZSgpKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMZWdhY3kgcmVmXG4gICAgUmVhY3RPd25lci5hZGRDb21wb25lbnRBc1JlZlRvKGNvbXBvbmVudCwgcmVmLCBvd25lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGV0YWNoUmVmKHJlZiwgY29tcG9uZW50LCBvd25lcikge1xuICBpZiAodHlwZW9mIHJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJlZihudWxsKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMZWdhY3kgcmVmXG4gICAgUmVhY3RPd25lci5yZW1vdmVDb21wb25lbnRBc1JlZkZyb20oY29tcG9uZW50LCByZWYsIG93bmVyKTtcbiAgfVxufVxuXG5SZWFjdFJlZi5hdHRhY2hSZWZzID0gZnVuY3Rpb24gKGluc3RhbmNlLCBlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgaWYgKHJlZiAhPSBudWxsKSB7XG4gICAgYXR0YWNoUmVmKHJlZiwgaW5zdGFuY2UsIGVsZW1lbnQuX293bmVyKTtcbiAgfVxufTtcblxuUmVhY3RSZWYuc2hvdWxkVXBkYXRlUmVmcyA9IGZ1bmN0aW9uIChwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQpIHtcbiAgLy8gSWYgZWl0aGVyIHRoZSBvd25lciBvciBhIGByZWZgIGhhcyBjaGFuZ2VkLCBtYWtlIHN1cmUgdGhlIG5ld2VzdCBvd25lclxuICAvLyBoYXMgc3RvcmVkIGEgcmVmZXJlbmNlIHRvIGB0aGlzYCwgYW5kIHRoZSBwcmV2aW91cyBvd25lciAoaWYgZGlmZmVyZW50KVxuICAvLyBoYXMgZm9yZ290dGVuIHRoZSByZWZlcmVuY2UgdG8gYHRoaXNgLiBXZSB1c2UgdGhlIGVsZW1lbnQgaW5zdGVhZFxuICAvLyBvZiB0aGUgcHVibGljIHRoaXMucHJvcHMgYmVjYXVzZSB0aGUgcG9zdCBwcm9jZXNzaW5nIGNhbm5vdCBkZXRlcm1pbmVcbiAgLy8gYSByZWYuIFRoZSByZWYgY29uY2VwdHVhbGx5IGxpdmVzIG9uIHRoZSBlbGVtZW50LlxuXG4gIC8vIFRPRE86IFNob3VsZCB0aGlzIGV2ZW4gYmUgcG9zc2libGU/IFRoZSBvd25lciBjYW5ub3QgY2hhbmdlIGJlY2F1c2VcbiAgLy8gaXQncyBmb3JiaWRkZW4gYnkgc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQuIFRoZSByZWYgY2FuIGNoYW5nZVxuICAvLyBpZiB5b3Ugc3dhcCB0aGUga2V5cyBvZiBidXQgbm90IHRoZSByZWZzLiBSZWNvbnNpZGVyIHdoZXJlIHRoaXMgY2hlY2tcbiAgLy8gaXMgbWFkZS4gSXQgcHJvYmFibHkgYmVsb25ncyB3aGVyZSB0aGUga2V5IGNoZWNraW5nIGFuZFxuICAvLyBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50IGlzIGRvbmUuXG5cbiAgdmFyIHByZXZFbXB0eSA9IHByZXZFbGVtZW50ID09PSBudWxsIHx8IHByZXZFbGVtZW50ID09PSBmYWxzZTtcbiAgdmFyIG5leHRFbXB0eSA9IG5leHRFbGVtZW50ID09PSBudWxsIHx8IG5leHRFbGVtZW50ID09PSBmYWxzZTtcblxuICByZXR1cm4oXG4gICAgLy8gVGhpcyBoYXMgYSBmZXcgZmFsc2UgcG9zaXRpdmVzIHcvci90IGVtcHR5IGNvbXBvbmVudHMuXG4gICAgcHJldkVtcHR5IHx8IG5leHRFbXB0eSB8fCBuZXh0RWxlbWVudC5fb3duZXIgIT09IHByZXZFbGVtZW50Ll9vd25lciB8fCBuZXh0RWxlbWVudC5yZWYgIT09IHByZXZFbGVtZW50LnJlZlxuICApO1xufTtcblxuUmVhY3RSZWYuZGV0YWNoUmVmcyA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgZWxlbWVudCkge1xuICBpZiAoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gIGlmIChyZWYgIT0gbnVsbCkge1xuICAgIGRldGFjaFJlZihyZWYsIGluc3RhbmNlLCBlbGVtZW50Ll9vd25lcik7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RSZWY7Il19