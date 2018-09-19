yoastWebpackJsonp([12],{

/***/ 2050:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _data = __webpack_require__(322);\n\n__webpack_require__(35);\n\n/* global wp, _, wpseoPrimaryCategoryL10n */\n/* External dependencies */\n(function ($) {\n\t\"use strict\";\n\n\tvar primaryTermUITemplate, primaryTermScreenReaderTemplate;\n\tvar taxonomies = wpseoPrimaryCategoryL10n.taxonomies;\n\n\t/**\n  * Checks if the elements to make a term the primary term and the display for a primary term exist.\n  *\n  * @param {Object} checkbox The checkbox to get the closest required fields for.\n  *\n  * @returns {boolean} True when there are primary elements.\n  */\n\tfunction hasPrimaryTermElements(checkbox) {\n\t\treturn 1 === $(checkbox).closest(\"li\").children(\".wpseo-make-primary-term\").length;\n\t}\n\n\t/**\n  * Retrieves the primary term for a taxonomy.\n  *\n  * @param {string} taxonomyName The taxonomy name.\n  *\n  * @returns {string} The value of the primary term.\n  */\n\tfunction getPrimaryTerm(taxonomyName) {\n\t\tvar primaryTermInput;\n\n\t\tprimaryTermInput = $(\"#yoast-wpseo-primary-\" + taxonomyName);\n\t\treturn primaryTermInput.val();\n\t}\n\n\t/**\n  * Gets the name of a term for the category taxonomy.\n  *\n  * @param {number} categoryTermId The terms's id.\n  *\n  * @returns {string} The term's name.\n  */\n\tfunction getCategoryTermName(categoryTermId) {\n\t\tvar categoryListItem = $(\"#category-all\").find(\"#category-\" + categoryTermId + \" > label\");\n\t\tif (categoryListItem.length === 0) {\n\t\t\treturn \"\";\n\t\t}\n\t\tvar clone = categoryListItem.clone();\n\t\tclone.children().remove();\n\t\treturn $.trim(clone.text());\n\t}\n\n\t/**\n  * Sets the primary term for a taxonomy.\n  *\n  * @param {string} taxonomyName The taxonomy name.\n  * @param {string} termId       The term id.\n  *\n  * @returns {void}\n  */\n\tfunction setPrimaryTerm(taxonomyName, termId) {\n\t\tvar primaryTermInput = $(\"#yoast-wpseo-primary-\" + taxonomyName);\n\t\tprimaryTermInput.val(termId).trigger(\"change\");\n\n\t\tvar yoastEditor = (0, _data.dispatch)(\"yoast-seo/editor\");\n\t\tif (yoastEditor) {\n\t\t\tvar termIdInt = parseInt(termId, 10);\n\t\t\tyoastEditor.setPrimaryTaxonomyId(taxonomyName, termIdInt);\n\t\t\t// If the taxonomy is category update the replacement variable.\n\t\t\tif (taxonomyName === \"category\") {\n\t\t\t\tyoastEditor.updateReplacementVariable(\"primary_category\", getCategoryTermName(termIdInt));\n\t\t\t}\n\t\t}\n\t}\n\n\t/**\n  * Creates the elements necessary to show something is a primary term or to make it the primary term.\n  *\n  * @param {string} taxonomyName The taxonomy name.\n  * @param {Object} checkbox     The checkbox to get label for.\n  *\n  * @returns {void}\n  */\n\tfunction createPrimaryTermElements(taxonomyName, checkbox) {\n\t\tvar label, html;\n\n\t\tlabel = $(checkbox).closest(\"label\");\n\n\t\thtml = primaryTermUITemplate({\n\t\t\ttaxonomy: taxonomies[taxonomyName],\n\t\t\tterm: label.text()\n\t\t});\n\n\t\tlabel.after(html);\n\t}\n\n\t/**\n  * Updates the primary term selectors/indicators for a certain taxonomy.\n  *\n  * @param {string} taxonomyName The taxonomy name.\n  *\n  * @returns {void}\n  */\n\tfunction updatePrimaryTermSelectors(taxonomyName) {\n\t\tvar checkedTerms;\n\t\tvar listItem, label;\n\n\t\tcheckedTerms = $(\"#\" + taxonomyName + 'checklist input[type=\"checkbox\"]:checked');\n\n\t\tvar taxonomyListItem = $(\"#\" + taxonomyName + \"checklist li\");\n\t\ttaxonomyListItem.removeClass(\"wpseo-term-unchecked wpseo-primary-term wpseo-non-primary-term\");\n\n\t\t$(\".wpseo-primary-category-label\").remove();\n\t\ttaxonomyListItem.addClass(\"wpseo-term-unchecked\");\n\n\t\t// If there is only one term selected we don't want to show our interface.\n\t\tif (checkedTerms.length <= 1) {\n\t\t\treturn;\n\t\t}\n\n\t\tcheckedTerms.each(function (i, term) {\n\t\t\tterm = $(term);\n\t\t\tlistItem = term.closest(\"li\");\n\t\t\tlistItem.removeClass(\"wpseo-term-unchecked\");\n\n\t\t\t// Create our interface elements if they don't exist.\n\t\t\tif (!hasPrimaryTermElements(term)) {\n\t\t\t\tcreatePrimaryTermElements(taxonomyName, term);\n\t\t\t}\n\n\t\t\tif (term.val() === getPrimaryTerm(taxonomyName)) {\n\t\t\t\tlistItem.addClass(\"wpseo-primary-term\");\n\n\t\t\t\tlabel = term.closest(\"label\");\n\t\t\t\tlabel.find(\".wpseo-primary-category-label\").remove();\n\t\t\t\tlabel.append(primaryTermScreenReaderTemplate({\n\t\t\t\t\ttaxonomy: taxonomies[taxonomyName]\n\t\t\t\t}));\n\t\t\t} else {\n\t\t\t\tlistItem.addClass(\"wpseo-non-primary-term\");\n\t\t\t}\n\t\t});\n\t}\n\n\t/**\n  * Makes the first term primary for a certain taxonomy.\n  *\n  * @param {string} taxonomyName The taxonomy name.\n  *\n  * @returns {void}\n  */\n\tfunction makeFirstTermPrimary(taxonomyName) {\n\t\tvar firstTerm = $(\"#\" + taxonomyName + 'checklist input[type=\"checkbox\"]:checked:first');\n\n\t\tsetPrimaryTerm(taxonomyName, firstTerm.val());\n\t\tupdatePrimaryTermSelectors(taxonomyName);\n\t}\n\n\t/**\n  * If we check a term while there is no primary term we make that one the primary term.\n  *\n  * @param {string} taxonomyName The taxonomy name.\n  *\n  * @returns {void}\n  */\n\tfunction ensurePrimaryTerm(taxonomyName) {\n\t\tif (\"\" === getPrimaryTerm(taxonomyName)) {\n\t\t\tmakeFirstTermPrimary(taxonomyName);\n\t\t}\n\t}\n\n\t/**\n  * Returns the term checkbox handler for a certain taxonomy name.\n  *\n  * @param {string} taxonomyName The taxonomy name.\n  *\n  * @returns {Function} Event handler for the checkbox.\n  */\n\tfunction termCheckboxHandler(taxonomyName) {\n\t\treturn function () {\n\t\t\t// If the user unchecks the primary category we have to select any new primary term\n\t\t\tif (false === $(this).prop(\"checked\") && $(this).val() === getPrimaryTerm(taxonomyName)) {\n\t\t\t\tmakeFirstTermPrimary(taxonomyName);\n\t\t\t}\n\n\t\t\tensurePrimaryTerm(taxonomyName);\n\n\t\t\tupdatePrimaryTermSelectors(taxonomyName);\n\t\t};\n\t}\n\n\t/**\n  * Returns the term list add handler for a certain taxonomy name.\n  *\n  * @param {string} taxonomyName The taxonomy name.\n  *\n  * @returns {Function} The term list add handler.\n  */\n\tfunction termListAddHandler(taxonomyName) {\n\t\treturn function () {\n\t\t\tensurePrimaryTerm(taxonomyName);\n\t\t\tupdatePrimaryTermSelectors(taxonomyName);\n\t\t};\n\t}\n\n\t/**\n  * Returns the make primary event handler for a certain taxonomy name.\n  *\n  * @param {string} taxonomyName The taxonomy name.\n  *\n  * @returns {Function} The event handler.\n  */\n\tfunction makePrimaryHandler(taxonomyName) {\n\t\treturn function (e) {\n\t\t\tvar term, checkbox;\n\n\t\t\tterm = $(e.currentTarget);\n\t\t\tcheckbox = term.siblings(\"label\").find(\"input\");\n\n\t\t\tsetPrimaryTerm(taxonomyName, checkbox.val());\n\n\t\t\tupdatePrimaryTermSelectors(taxonomyName);\n\n\t\t\t// The clicked link will be hidden so we need to focus something different.\n\t\t\tcheckbox.focus();\n\t\t};\n\t}\n\n\t$.fn.initYstSEOPrimaryCategory = function () {\n\t\treturn this.each(function (i, taxonomy) {\n\t\t\tvar metaboxTaxonomy = $(\"#\" + taxonomy.name + \"div\");\n\n\t\t\tupdatePrimaryTermSelectors(taxonomy.name);\n\n\t\t\tmetaboxTaxonomy.on(\"click\", 'input[type=\"checkbox\"]', termCheckboxHandler(taxonomy.name));\n\n\t\t\t// When the AJAX Request is done, this event will be fired.\n\t\t\tmetaboxTaxonomy.on(\"wpListAddEnd\", \"#\" + taxonomy.name + \"checklist\", termListAddHandler(taxonomy.name));\n\n\t\t\tmetaboxTaxonomy.on(\"click\", \".wpseo-make-primary-term\", makePrimaryHandler(taxonomy.name));\n\t\t});\n\t};\n\n\t$(function () {\n\t\t// Initialize our templates\n\t\tprimaryTermUITemplate = wp.template(\"primary-term-ui\");\n\t\tprimaryTermScreenReaderTemplate = wp.template(\"primary-term-screen-reader\");\n\n\t\t$(_.values(taxonomies)).initYstSEOPrimaryCategory();\n\t});\n})(jQuery);\n\n/* Internal dependencies *///# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjA1MC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9qcy9zcmMvd3Atc2VvLW1ldGFib3gtY2F0ZWdvcnkuanM/MzFlMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgd3AsIF8sIHdwc2VvUHJpbWFyeUNhdGVnb3J5TDEwbiAqL1xuLyogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzICovXG5pbXBvcnQgeyBkaXNwYXRjaCB9IGZyb20gXCJAd29yZHByZXNzL2RhdGFcIjtcblxuLyogSW50ZXJuYWwgZGVwZW5kZW5jaWVzICovXG5pbXBvcnQgXCIuL2hlbHBlcnMvYmFiZWwtcG9seWZpbGxcIjtcblxuKCBmdW5jdGlvbiggJCApIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIHByaW1hcnlUZXJtVUlUZW1wbGF0ZSwgcHJpbWFyeVRlcm1TY3JlZW5SZWFkZXJUZW1wbGF0ZTtcblx0dmFyIHRheG9ub21pZXMgPSB3cHNlb1ByaW1hcnlDYXRlZ29yeUwxMG4udGF4b25vbWllcztcblxuXHQvKipcblx0ICogQ2hlY2tzIGlmIHRoZSBlbGVtZW50cyB0byBtYWtlIGEgdGVybSB0aGUgcHJpbWFyeSB0ZXJtIGFuZCB0aGUgZGlzcGxheSBmb3IgYSBwcmltYXJ5IHRlcm0gZXhpc3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBjaGVja2JveCBUaGUgY2hlY2tib3ggdG8gZ2V0IHRoZSBjbG9zZXN0IHJlcXVpcmVkIGZpZWxkcyBmb3IuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIHdoZW4gdGhlcmUgYXJlIHByaW1hcnkgZWxlbWVudHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBoYXNQcmltYXJ5VGVybUVsZW1lbnRzKCBjaGVja2JveCApIHtcblx0XHRyZXR1cm4gMSA9PT0gJCggY2hlY2tib3ggKS5jbG9zZXN0KCBcImxpXCIgKS5jaGlsZHJlbiggXCIud3BzZW8tbWFrZS1wcmltYXJ5LXRlcm1cIiApLmxlbmd0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZXMgdGhlIHByaW1hcnkgdGVybSBmb3IgYSB0YXhvbm9teS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRheG9ub215TmFtZSBUaGUgdGF4b25vbXkgbmFtZS5cblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIHZhbHVlIG9mIHRoZSBwcmltYXJ5IHRlcm0uXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRQcmltYXJ5VGVybSggdGF4b25vbXlOYW1lICkge1xuXHRcdHZhciBwcmltYXJ5VGVybUlucHV0O1xuXG5cdFx0cHJpbWFyeVRlcm1JbnB1dCA9ICQoIFwiI3lvYXN0LXdwc2VvLXByaW1hcnktXCIgKyB0YXhvbm9teU5hbWUgKTtcblx0XHRyZXR1cm4gcHJpbWFyeVRlcm1JbnB1dC52YWwoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBuYW1lIG9mIGEgdGVybSBmb3IgdGhlIGNhdGVnb3J5IHRheG9ub215LlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gY2F0ZWdvcnlUZXJtSWQgVGhlIHRlcm1zJ3MgaWQuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB0ZXJtJ3MgbmFtZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldENhdGVnb3J5VGVybU5hbWUoIGNhdGVnb3J5VGVybUlkICkge1xuXHRcdGNvbnN0IGNhdGVnb3J5TGlzdEl0ZW0gPSAkKCBcIiNjYXRlZ29yeS1hbGxcIiApXG5cdFx0XHQuZmluZCggYCNjYXRlZ29yeS0keyBjYXRlZ29yeVRlcm1JZCB9ID4gbGFiZWxgICk7XG5cdFx0aWYgKCBjYXRlZ29yeUxpc3RJdGVtLmxlbmd0aCA9PT0gMCApIHtcblx0XHRcdHJldHVybiBcIlwiO1xuXHRcdH1cblx0XHRjb25zdCBjbG9uZSA9IGNhdGVnb3J5TGlzdEl0ZW0uY2xvbmUoKTtcblx0XHRjbG9uZS5jaGlsZHJlbigpLnJlbW92ZSgpO1xuXHRcdHJldHVybiAkLnRyaW0oIGNsb25lLnRleHQoKSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIHByaW1hcnkgdGVybSBmb3IgYSB0YXhvbm9teS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRheG9ub215TmFtZSBUaGUgdGF4b25vbXkgbmFtZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHRlcm1JZCAgICAgICBUaGUgdGVybSBpZC5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBzZXRQcmltYXJ5VGVybSggdGF4b25vbXlOYW1lLCB0ZXJtSWQgKSB7XG5cdFx0Y29uc3QgcHJpbWFyeVRlcm1JbnB1dCA9ICQoIFwiI3lvYXN0LXdwc2VvLXByaW1hcnktXCIgKyB0YXhvbm9teU5hbWUgKTtcblx0XHRwcmltYXJ5VGVybUlucHV0LnZhbCggdGVybUlkICkudHJpZ2dlciggXCJjaGFuZ2VcIiApO1xuXG5cdFx0Y29uc3QgeW9hc3RFZGl0b3IgPSBkaXNwYXRjaCggXCJ5b2FzdC1zZW8vZWRpdG9yXCIgKTtcblx0XHRpZiAoIHlvYXN0RWRpdG9yICkge1xuXHRcdFx0Y29uc3QgdGVybUlkSW50ID0gcGFyc2VJbnQoIHRlcm1JZCwgMTAgKTtcblx0XHRcdHlvYXN0RWRpdG9yLnNldFByaW1hcnlUYXhvbm9teUlkKCB0YXhvbm9teU5hbWUsIHRlcm1JZEludCApO1xuXHRcdFx0Ly8gSWYgdGhlIHRheG9ub215IGlzIGNhdGVnb3J5IHVwZGF0ZSB0aGUgcmVwbGFjZW1lbnQgdmFyaWFibGUuXG5cdFx0XHRpZiAoIHRheG9ub215TmFtZSA9PT0gXCJjYXRlZ29yeVwiICkge1xuXHRcdFx0XHR5b2FzdEVkaXRvci51cGRhdGVSZXBsYWNlbWVudFZhcmlhYmxlKFxuXHRcdFx0XHRcdFwicHJpbWFyeV9jYXRlZ29yeVwiLFxuXHRcdFx0XHRcdGdldENhdGVnb3J5VGVybU5hbWUoIHRlcm1JZEludCApXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgdGhlIGVsZW1lbnRzIG5lY2Vzc2FyeSB0byBzaG93IHNvbWV0aGluZyBpcyBhIHByaW1hcnkgdGVybSBvciB0byBtYWtlIGl0IHRoZSBwcmltYXJ5IHRlcm0uXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0YXhvbm9teU5hbWUgVGhlIHRheG9ub215IG5hbWUuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBjaGVja2JveCAgICAgVGhlIGNoZWNrYm94IHRvIGdldCBsYWJlbCBmb3IuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gY3JlYXRlUHJpbWFyeVRlcm1FbGVtZW50cyggdGF4b25vbXlOYW1lLCBjaGVja2JveCApIHtcblx0XHR2YXIgbGFiZWwsIGh0bWw7XG5cblx0XHRsYWJlbCA9ICQoIGNoZWNrYm94ICkuY2xvc2VzdCggXCJsYWJlbFwiICk7XG5cblx0XHRodG1sID0gcHJpbWFyeVRlcm1VSVRlbXBsYXRlKCB7XG5cdFx0XHR0YXhvbm9teTogdGF4b25vbWllc1sgdGF4b25vbXlOYW1lIF0sXG5cdFx0XHR0ZXJtOiBsYWJlbC50ZXh0KCksXG5cdFx0fSApO1xuXG5cdFx0bGFiZWwuYWZ0ZXIoIGh0bWwgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSBwcmltYXJ5IHRlcm0gc2VsZWN0b3JzL2luZGljYXRvcnMgZm9yIGEgY2VydGFpbiB0YXhvbm9teS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRheG9ub215TmFtZSBUaGUgdGF4b25vbXkgbmFtZS5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiB1cGRhdGVQcmltYXJ5VGVybVNlbGVjdG9ycyggdGF4b25vbXlOYW1lICkge1xuXHRcdHZhciBjaGVja2VkVGVybXM7XG5cdFx0dmFyIGxpc3RJdGVtLCBsYWJlbDtcblxuXHRcdGNoZWNrZWRUZXJtcyA9ICQoIFwiI1wiICsgdGF4b25vbXlOYW1lICsgJ2NoZWNrbGlzdCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZCcgKTtcblxuXHRcdHZhciB0YXhvbm9teUxpc3RJdGVtID0gJCggXCIjXCIgKyB0YXhvbm9teU5hbWUgKyBcImNoZWNrbGlzdCBsaVwiICk7XG5cdFx0dGF4b25vbXlMaXN0SXRlbS5yZW1vdmVDbGFzcyggXCJ3cHNlby10ZXJtLXVuY2hlY2tlZCB3cHNlby1wcmltYXJ5LXRlcm0gd3BzZW8tbm9uLXByaW1hcnktdGVybVwiICk7XG5cblx0XHQkKCBcIi53cHNlby1wcmltYXJ5LWNhdGVnb3J5LWxhYmVsXCIgKS5yZW1vdmUoKTtcblx0XHR0YXhvbm9teUxpc3RJdGVtLmFkZENsYXNzKCBcIndwc2VvLXRlcm0tdW5jaGVja2VkXCIgKTtcblxuXHRcdC8vIElmIHRoZXJlIGlzIG9ubHkgb25lIHRlcm0gc2VsZWN0ZWQgd2UgZG9uJ3Qgd2FudCB0byBzaG93IG91ciBpbnRlcmZhY2UuXG5cdFx0aWYgKCBjaGVja2VkVGVybXMubGVuZ3RoIDw9IDEgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y2hlY2tlZFRlcm1zLmVhY2goIGZ1bmN0aW9uKCBpLCB0ZXJtICkge1xuXHRcdFx0dGVybSA9ICQoIHRlcm0gKTtcblx0XHRcdGxpc3RJdGVtID0gdGVybS5jbG9zZXN0KCBcImxpXCIgKTtcblx0XHRcdGxpc3RJdGVtLnJlbW92ZUNsYXNzKCBcIndwc2VvLXRlcm0tdW5jaGVja2VkXCIgKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIG91ciBpbnRlcmZhY2UgZWxlbWVudHMgaWYgdGhleSBkb24ndCBleGlzdC5cblx0XHRcdGlmICggISBoYXNQcmltYXJ5VGVybUVsZW1lbnRzKCB0ZXJtICkgKSB7XG5cdFx0XHRcdGNyZWF0ZVByaW1hcnlUZXJtRWxlbWVudHMoIHRheG9ub215TmFtZSwgdGVybSApO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHRlcm0udmFsKCkgPT09IGdldFByaW1hcnlUZXJtKCB0YXhvbm9teU5hbWUgKSApIHtcblx0XHRcdFx0bGlzdEl0ZW0uYWRkQ2xhc3MoIFwid3BzZW8tcHJpbWFyeS10ZXJtXCIgKTtcblxuXHRcdFx0XHRsYWJlbCA9IHRlcm0uY2xvc2VzdCggXCJsYWJlbFwiICk7XG5cdFx0XHRcdGxhYmVsLmZpbmQoIFwiLndwc2VvLXByaW1hcnktY2F0ZWdvcnktbGFiZWxcIiApLnJlbW92ZSgpO1xuXHRcdFx0XHRsYWJlbC5hcHBlbmQoIHByaW1hcnlUZXJtU2NyZWVuUmVhZGVyVGVtcGxhdGUoIHtcblx0XHRcdFx0XHR0YXhvbm9teTogdGF4b25vbWllc1sgdGF4b25vbXlOYW1lIF0sXG5cdFx0XHRcdH0gKSApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxpc3RJdGVtLmFkZENsYXNzKCBcIndwc2VvLW5vbi1wcmltYXJ5LXRlcm1cIiApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlcyB0aGUgZmlyc3QgdGVybSBwcmltYXJ5IGZvciBhIGNlcnRhaW4gdGF4b25vbXkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0YXhvbm9teU5hbWUgVGhlIHRheG9ub215IG5hbWUuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gbWFrZUZpcnN0VGVybVByaW1hcnkoIHRheG9ub215TmFtZSApIHtcblx0XHR2YXIgZmlyc3RUZXJtID0gJCggXCIjXCIgKyB0YXhvbm9teU5hbWUgKyAnY2hlY2tsaXN0IGlucHV0W3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkOmZpcnN0JyApO1xuXG5cdFx0c2V0UHJpbWFyeVRlcm0oIHRheG9ub215TmFtZSwgZmlyc3RUZXJtLnZhbCgpICk7XG5cdFx0dXBkYXRlUHJpbWFyeVRlcm1TZWxlY3RvcnMoIHRheG9ub215TmFtZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIElmIHdlIGNoZWNrIGEgdGVybSB3aGlsZSB0aGVyZSBpcyBubyBwcmltYXJ5IHRlcm0gd2UgbWFrZSB0aGF0IG9uZSB0aGUgcHJpbWFyeSB0ZXJtLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGF4b25vbXlOYW1lIFRoZSB0YXhvbm9teSBuYW1lLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIGVuc3VyZVByaW1hcnlUZXJtKCB0YXhvbm9teU5hbWUgKSB7XG5cdFx0aWYgKCBcIlwiID09PSBnZXRQcmltYXJ5VGVybSggdGF4b25vbXlOYW1lICkgKSB7XG5cdFx0XHRtYWtlRmlyc3RUZXJtUHJpbWFyeSggdGF4b25vbXlOYW1lICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHRlcm0gY2hlY2tib3ggaGFuZGxlciBmb3IgYSBjZXJ0YWluIHRheG9ub215IG5hbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0YXhvbm9teU5hbWUgVGhlIHRheG9ub215IG5hbWUuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtGdW5jdGlvbn0gRXZlbnQgaGFuZGxlciBmb3IgdGhlIGNoZWNrYm94LlxuXHQgKi9cblx0ZnVuY3Rpb24gdGVybUNoZWNrYm94SGFuZGxlciggdGF4b25vbXlOYW1lICkge1xuXHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdC8vIElmIHRoZSB1c2VyIHVuY2hlY2tzIHRoZSBwcmltYXJ5IGNhdGVnb3J5IHdlIGhhdmUgdG8gc2VsZWN0IGFueSBuZXcgcHJpbWFyeSB0ZXJtXG5cdFx0XHRpZiAoIGZhbHNlID09PSAkKCB0aGlzICkucHJvcCggXCJjaGVja2VkXCIgKSAmJiAkKCB0aGlzICkudmFsKCkgPT09IGdldFByaW1hcnlUZXJtKCB0YXhvbm9teU5hbWUgKSApIHtcblx0XHRcdFx0bWFrZUZpcnN0VGVybVByaW1hcnkoIHRheG9ub215TmFtZSApO1xuXHRcdFx0fVxuXG5cdFx0XHRlbnN1cmVQcmltYXJ5VGVybSggdGF4b25vbXlOYW1lICk7XG5cblx0XHRcdHVwZGF0ZVByaW1hcnlUZXJtU2VsZWN0b3JzKCB0YXhvbm9teU5hbWUgKTtcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHRlcm0gbGlzdCBhZGQgaGFuZGxlciBmb3IgYSBjZXJ0YWluIHRheG9ub215IG5hbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0YXhvbm9teU5hbWUgVGhlIHRheG9ub215IG5hbWUuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIHRlcm0gbGlzdCBhZGQgaGFuZGxlci5cblx0ICovXG5cdGZ1bmN0aW9uIHRlcm1MaXN0QWRkSGFuZGxlciggdGF4b25vbXlOYW1lICkge1xuXHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdGVuc3VyZVByaW1hcnlUZXJtKCB0YXhvbm9teU5hbWUgKTtcblx0XHRcdHVwZGF0ZVByaW1hcnlUZXJtU2VsZWN0b3JzKCB0YXhvbm9teU5hbWUgKTtcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG1ha2UgcHJpbWFyeSBldmVudCBoYW5kbGVyIGZvciBhIGNlcnRhaW4gdGF4b25vbXkgbmFtZS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRheG9ub215TmFtZSBUaGUgdGF4b25vbXkgbmFtZS5cblx0ICpcblx0ICogQHJldHVybnMge0Z1bmN0aW9ufSBUaGUgZXZlbnQgaGFuZGxlci5cblx0ICovXG5cdGZ1bmN0aW9uIG1ha2VQcmltYXJ5SGFuZGxlciggdGF4b25vbXlOYW1lICkge1xuXHRcdHJldHVybiBmdW5jdGlvbiggZSApIHtcblx0XHRcdHZhciB0ZXJtLCBjaGVja2JveDtcblxuXHRcdFx0dGVybSA9ICQoIGUuY3VycmVudFRhcmdldCApO1xuXHRcdFx0Y2hlY2tib3ggPSB0ZXJtLnNpYmxpbmdzKCBcImxhYmVsXCIgKS5maW5kKCBcImlucHV0XCIgKTtcblxuXHRcdFx0c2V0UHJpbWFyeVRlcm0oIHRheG9ub215TmFtZSwgY2hlY2tib3gudmFsKCkgKTtcblxuXHRcdFx0dXBkYXRlUHJpbWFyeVRlcm1TZWxlY3RvcnMoIHRheG9ub215TmFtZSApO1xuXG5cdFx0XHQvLyBUaGUgY2xpY2tlZCBsaW5rIHdpbGwgYmUgaGlkZGVuIHNvIHdlIG5lZWQgdG8gZm9jdXMgc29tZXRoaW5nIGRpZmZlcmVudC5cblx0XHRcdGNoZWNrYm94LmZvY3VzKCk7XG5cdFx0fTtcblx0fVxuXG5cdCQuZm4uaW5pdFlzdFNFT1ByaW1hcnlDYXRlZ29yeSA9IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpLCB0YXhvbm9teSApIHtcblx0XHRcdGNvbnN0IG1ldGFib3hUYXhvbm9teSA9ICQoIFwiI1wiICsgdGF4b25vbXkubmFtZSArIFwiZGl2XCIgKTtcblxuXHRcdFx0dXBkYXRlUHJpbWFyeVRlcm1TZWxlY3RvcnMoIHRheG9ub215Lm5hbWUgKTtcblxuXHRcdFx0bWV0YWJveFRheG9ub215Lm9uKCBcImNsaWNrXCIsICdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nLCB0ZXJtQ2hlY2tib3hIYW5kbGVyKCB0YXhvbm9teS5uYW1lICkgKTtcblxuXHRcdFx0Ly8gV2hlbiB0aGUgQUpBWCBSZXF1ZXN0IGlzIGRvbmUsIHRoaXMgZXZlbnQgd2lsbCBiZSBmaXJlZC5cblx0XHRcdG1ldGFib3hUYXhvbm9teS5vbiggXCJ3cExpc3RBZGRFbmRcIiwgXCIjXCIgKyB0YXhvbm9teS5uYW1lICsgXCJjaGVja2xpc3RcIiwgdGVybUxpc3RBZGRIYW5kbGVyKCB0YXhvbm9teS5uYW1lICkgKTtcblxuXHRcdFx0bWV0YWJveFRheG9ub215Lm9uKCBcImNsaWNrXCIsIFwiLndwc2VvLW1ha2UtcHJpbWFyeS10ZXJtXCIsIG1ha2VQcmltYXJ5SGFuZGxlciggdGF4b25vbXkubmFtZSApICk7XG5cdFx0fSApO1xuXHR9O1xuXG5cdCQoIGZ1bmN0aW9uKCkge1xuXHRcdC8vIEluaXRpYWxpemUgb3VyIHRlbXBsYXRlc1xuXHRcdHByaW1hcnlUZXJtVUlUZW1wbGF0ZSA9IHdwLnRlbXBsYXRlKCBcInByaW1hcnktdGVybS11aVwiICk7XG5cdFx0cHJpbWFyeVRlcm1TY3JlZW5SZWFkZXJUZW1wbGF0ZSA9IHdwLnRlbXBsYXRlKCBcInByaW1hcnktdGVybS1zY3JlZW4tcmVhZGVyXCIgKTtcblxuXHRcdCQoIF8udmFsdWVzKCB0YXhvbm9taWVzICkgKS5pbml0WXN0U0VPUHJpbWFyeUNhdGVnb3J5KCk7XG5cdH0gKTtcbn0oIGpRdWVyeSApICk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8ganMvc3JjL3dwLXNlby1tZXRhYm94LWNhdGVnb3J5LmpzIl0sIm1hcHBpbmdzIjoiOztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBTkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL1BBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///2050\n");

/***/ }),

/***/ 322:
/***/ (function(module, exports) {

eval("module.exports = window.yoast._wp.data;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzIyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luZG93LnlvYXN0Ll93cC5kYXRhXCI/MjNkZiJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy55b2FzdC5fd3AuZGF0YTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbmRvdy55b2FzdC5fd3AuZGF0YVwiXG4vLyBtb2R1bGUgaWQgPSAzMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMgMTIiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///322\n");

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// The babel polyfill sets the _babelPolyfill to true. So only load it ourselves if the variable is undefined or false.\nif (typeof window._babelPolyfill === \"undefined\" || !window._babelPolyfill) {\n\t// eslint-disable-next-line global-require\n\t__webpack_require__(104);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vanMvc3JjL2hlbHBlcnMvYmFiZWwtcG9seWZpbGwuanM/MTdiOSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgYmFiZWwgcG9seWZpbGwgc2V0cyB0aGUgX2JhYmVsUG9seWZpbGwgdG8gdHJ1ZS4gU28gb25seSBsb2FkIGl0IG91cnNlbHZlcyBpZiB0aGUgdmFyaWFibGUgaXMgdW5kZWZpbmVkIG9yIGZhbHNlLlxuaWYgKCB0eXBlb2Ygd2luZG93Ll9iYWJlbFBvbHlmaWxsID09PSBcInVuZGVmaW5lZFwiIHx8ICEgd2luZG93Ll9iYWJlbFBvbHlmaWxsICkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ2xvYmFsLXJlcXVpcmVcblx0cmVxdWlyZSggXCJiYWJlbC1wb2x5ZmlsbFwiICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8ganMvc3JjL2hlbHBlcnMvYmFiZWwtcG9seWZpbGwuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///35\n");

/***/ })

},[2050]);