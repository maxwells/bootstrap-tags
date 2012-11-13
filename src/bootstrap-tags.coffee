# Bootstrap Tags
# Max Lahey
# Monday, November 12, 2012

jQuery ->
  $.tags = (element, options) ->
   # default plugin settings
    @defaults = {}

    # jQuery version of DOM element attached to the plugin
    @$element = $ element

    ## private methods
    # set the current state
    setState = (@state) =>

    # get the arrow Css
    getArrowCss = =>

    ## public methods
    # get particular plugin setting
    @getSetting = (settingKey) ->
      @settings[settingKey]

    # call one of the plugin setting functions
    @callSettingFunction = (functionName) ->
      @settings[functionName](element, @$tags[0])

    # get miniTip content
    @getContent = ->
      content

    @init = ->
      alert "init"

    @init()

    this

  $.fn.tags = (options) ->
    return this.each ->
      tags = new $.tags this, options
      #if undefined == ($ this).data('minTip')
      #  miniTip = new $.miniTip this, options
      #  ($ this).data 'minTip', miniTip