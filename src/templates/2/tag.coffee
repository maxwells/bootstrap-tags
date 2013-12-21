window.Tags ||= {}
Tags.Templates ||= {}
Tags.Templates["2"] ||= {}
Tags.Templates["2"].tag = (options = {}) ->
  "<div class='tag label #{options.tagClass}' #{ if options.isPopover then "rel='popover'" else "" }>
    <span>#{Tags.Helpers.addPadding options.tag, 2, options.isReadOnly}</span>
    #{ if options.isReadOnly then "" else "<a><i class='icon-remove-sign icon-white' /></a>" }
  </div>"