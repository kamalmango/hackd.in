/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactEmptyComponentRegistry
 */

'use strict';

// This registry keeps track of the React IDs of the components that rendered to
// `null` (in reality a placeholder such as `noscript`)

var nullComponentIDsRegistry = {};

/**
 * @param {string} id Component's `_rootNodeID`.
 * @return {boolean} True if the component is rendered to null.
 */
function isNullComponentID(id) {
  return !!nullComponentIDsRegistry[id];
}

/**
 * Mark the component as having rendered to null.
 * @param {string} id Component's `_rootNodeID`.
 */
function registerNullComponentID(id) {
  nullComponentIDsRegistry[id] = true;
}

/**
 * Unmark the component as having rendered to null: it renders to something now.
 * @param {string} id Component's `_rootNodeID`.
 */
function deregisterNullComponentID(id) {
  delete nullComponentIDsRegistry[id];
}

var ReactEmptyComponentRegistry = {
  isNullComponentID: isNullComponentID,
  registerNullComponentID: registerNullComponentID,
  deregisterNullComponentID: deregisterNullComponentID
};

module.exports = ReactEmptyComponentRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1JlYWN0RW1wdHlDb21wb25lbnRSZWdpc3RyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVdBOzs7OztBQUlBLElBQUksMkJBQTJCLEVBQS9COzs7Ozs7QUFNQSxTQUFTLGlCQUFULENBQTJCLEVBQTNCLEVBQStCO0FBQzdCLFNBQU8sQ0FBQyxDQUFDLHlCQUF5QixFQUF6QixDQUFUO0FBQ0Q7Ozs7OztBQU1ELFNBQVMsdUJBQVQsQ0FBaUMsRUFBakMsRUFBcUM7QUFDbkMsMkJBQXlCLEVBQXpCLElBQStCLElBQS9CO0FBQ0Q7Ozs7OztBQU1ELFNBQVMseUJBQVQsQ0FBbUMsRUFBbkMsRUFBdUM7QUFDckMsU0FBTyx5QkFBeUIsRUFBekIsQ0FBUDtBQUNEOztBQUVELElBQUksOEJBQThCO0FBQ2hDLHFCQUFtQixpQkFEYTtBQUVoQywyQkFBeUIsdUJBRk87QUFHaEMsNkJBQTJCO0FBSEssQ0FBbEM7O0FBTUEsT0FBTyxPQUFQLEdBQWlCLDJCQUFqQiIsImZpbGUiOiJSZWFjdEVtcHR5Q29tcG9uZW50UmVnaXN0cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RFbXB0eUNvbXBvbmVudFJlZ2lzdHJ5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGlzIHJlZ2lzdHJ5IGtlZXBzIHRyYWNrIG9mIHRoZSBSZWFjdCBJRHMgb2YgdGhlIGNvbXBvbmVudHMgdGhhdCByZW5kZXJlZCB0b1xuLy8gYG51bGxgIChpbiByZWFsaXR5IGEgcGxhY2Vob2xkZXIgc3VjaCBhcyBgbm9zY3JpcHRgKVxudmFyIG51bGxDb21wb25lbnRJRHNSZWdpc3RyeSA9IHt9O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCBDb21wb25lbnQncyBgX3Jvb3ROb2RlSURgLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgY29tcG9uZW50IGlzIHJlbmRlcmVkIHRvIG51bGwuXG4gKi9cbmZ1bmN0aW9uIGlzTnVsbENvbXBvbmVudElEKGlkKSB7XG4gIHJldHVybiAhIW51bGxDb21wb25lbnRJRHNSZWdpc3RyeVtpZF07XG59XG5cbi8qKlxuICogTWFyayB0aGUgY29tcG9uZW50IGFzIGhhdmluZyByZW5kZXJlZCB0byBudWxsLlxuICogQHBhcmFtIHtzdHJpbmd9IGlkIENvbXBvbmVudCdzIGBfcm9vdE5vZGVJRGAuXG4gKi9cbmZ1bmN0aW9uIHJlZ2lzdGVyTnVsbENvbXBvbmVudElEKGlkKSB7XG4gIG51bGxDb21wb25lbnRJRHNSZWdpc3RyeVtpZF0gPSB0cnVlO1xufVxuXG4vKipcbiAqIFVubWFyayB0aGUgY29tcG9uZW50IGFzIGhhdmluZyByZW5kZXJlZCB0byBudWxsOiBpdCByZW5kZXJzIHRvIHNvbWV0aGluZyBub3cuXG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgQ29tcG9uZW50J3MgYF9yb290Tm9kZUlEYC5cbiAqL1xuZnVuY3Rpb24gZGVyZWdpc3Rlck51bGxDb21wb25lbnRJRChpZCkge1xuICBkZWxldGUgbnVsbENvbXBvbmVudElEc1JlZ2lzdHJ5W2lkXTtcbn1cblxudmFyIFJlYWN0RW1wdHlDb21wb25lbnRSZWdpc3RyeSA9IHtcbiAgaXNOdWxsQ29tcG9uZW50SUQ6IGlzTnVsbENvbXBvbmVudElELFxuICByZWdpc3Rlck51bGxDb21wb25lbnRJRDogcmVnaXN0ZXJOdWxsQ29tcG9uZW50SUQsXG4gIGRlcmVnaXN0ZXJOdWxsQ29tcG9uZW50SUQ6IGRlcmVnaXN0ZXJOdWxsQ29tcG9uZW50SURcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RFbXB0eUNvbXBvbmVudFJlZ2lzdHJ5OyJdfQ==