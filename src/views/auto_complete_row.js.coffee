class Tags.Views.AutoCompleteRow extends Tags.Views.Base
  template: JST['templates/auto_complete_row']

  select: ->
    @$('.tags-autocomplete-suggestion').addClass 'selected'

  deselect: ->
    @$('.tags-autocomplete-suggestion').removeClass 'selected'

  getTitle: ->
    @options.title

  render: ->
    @$el.html @$template @options
    @