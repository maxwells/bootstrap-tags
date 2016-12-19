window.Tags ||= {}
Tags.Templates ||= {}
Tags.Templates["2"] ||= {}
Tags.Templates["2"].tag = (options = {}) ->
  "<div class='tag label #{options.tagClass} #{options.tagSize}' #{ if options.isPopover then "rel='popover'" else "" }>
    <span>
      #{ if options.href? then "<a href='#{options.href}'>" else ""}
        #{Tags.Helpers.addPadding options.tag, 2, options.isReadOnly}
      #{ if options.href? then "</a>" else ""}
    </span>
    #{ if options.isReadOnly then "" else "<a><i class='remove icon-remove-sign icon-white' /></a>" }
  </div>"
