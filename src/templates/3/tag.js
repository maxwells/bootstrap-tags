(function() {
  var base;

  window.Tags || (window.Tags = {});

  Tags.Templates || (Tags.Templates = {});

  (base = Tags.Templates)["3"] || (base["3"] = {});

  Tags.Templates["3"].tag = function(options) {
    if (options == null) {
      options = {};
    }
    return "<div class='tag label " + options.tagClass + " " + options.tagSize + "' " + (options.isPopover ? "rel='popover'" : "") + "> <span>" + (Tags.Helpers.addPadding(options.tag, 2, options.isReadOnly)) + "</span> " + (options.isReadOnly ? "" : "<a class='remove glyphicon glyphicon-remove-sign glyphicon-white'></a>") + " </div>";
  };

}).call(this);

//# sourceMappingURL=tag.js.map
