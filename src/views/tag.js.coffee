class Tags.Views.Tag extends Tags.Views.Base
  template: JST["templates/tag"]

  classes: 'tag'

  constructor: (options = {}) ->
    super()
    $.extend @, options

  destroy: =>
    @trigger 'destroyed', @model

  render: (options) ->
    @$el.html @$template
      options: options
      model: @model
    @$('.close').click @destroy
    @

window.Tag = Tags.Views.Tag