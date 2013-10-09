class Tags.Views.AutoCompleteRow extends Tags.Views.Base
  template: JST['templates/auto_complete_row']

  select: ->
    @$('.tags-autocomplete-suggestion').addClass 'selected'

  deselect: ->
    @$('.tags-autocomplete-suggestion').removeClass 'selected'

  getTitle: ->
    @options.title

  onClick: (e) =>
    @trigger 'clicked', @options.title

  onMouseOver: (e) =>
    @select()

  onMouseOut: (e) =>
    @deselect()

  render: ->
    @$el.html @$template @options
    @$el.click @onClick
    @$el.mouseover @onMouseOver
    @$el.mouseout @onMouseOut
    @