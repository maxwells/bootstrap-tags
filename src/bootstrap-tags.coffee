# Bootstrap Tags
# Max Lahey
# Monday, November 12, 2012

# Reference jQuery
$ = jQuery

$.fn.extend

  tags: (options) ->
    # Default settings
    settings =
      option1: true
      option2: false
      debug: false

    # Merge default settings with options.
    settings = $.extend settings, options

    # Simple logger.
    log = (msg) ->
      console?.log msg if settings.debug

    # _Insert magic here._
    return @each ()->
      alert "Preparing magic show."
      # You can use your settings in here now.
      #log "Option 1 value: #{settings.option1}"