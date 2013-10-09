this["JST"] = this["JST"] || {};

this["JST"]["templates/auto_complete"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'tags-autocomplete-suggestions\'>\n</div>';

}
return __p
};

this["JST"]["templates/auto_complete_row"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'tags-autocomplete-suggestion\'>\n  ' +
((__t = ( title )) == null ? '' : __t) +
'\n</div>';

}
return __p
};

this["JST"]["templates/tag"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'tag-label ' +
((__t = ( options.labelClass )) == null ? '' : __t) +
'\'>\n  <div class=\'text\'>\n    ' +
((__t = ( model.name )) == null ? '' : __t) +
'\n  </div>\n  <div class=\'\'>\n    <button type="button" class="close bootstrap-tags-label-close" aria-hidden="true">&times;</button>\n  </div>\n</div>';

}
return __p
};

this["JST"]["templates/tagger"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'tagger\'>\n  <div class=\'tags\'></div>\n  <input type=\'text\' class=\'form-control tags-input input-sm\'>\n</div>';

}
return __p
};