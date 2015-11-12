(function() {
  var base;

  window.Tags || (window.Tags = {});

  Tags.Templates || (Tags.Templates = {});

  (base = Tags.Templates)["2"] || (base["2"] = {});

  Tags.Templates["2"].tag = function(options) {
    if (options == null) {
      options = {};
    }
    return "<div class='tag label " + options.tagClass + " " + options.tagSize + "' " + (options.isPopover ? "rel='popover'" : "") + "> <span>" + (Tags.Helpers.addPadding(options.tag, 2, options.isReadOnly)) + "</span> " + (options.isReadOnly ? "" : "<a><i class='remove icon-remove-sign icon-white' /></a>") + " </div>";
  };

}).call(this);

//# sourceMappingURL=tag.js.map
