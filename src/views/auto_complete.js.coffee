class Tags.Views.AutoComplete extends Tags.Views.Base
  template: JST["templates/auto_complete"]

  classes: "tags-autocomplete"

  initialize: (options) ->
    @index = 0
    @matches = []
    @suggestionViews = []

  update: (text, match = true) ->
    @matches = []
    if match
      for suggestion in @options.suggestions
        if suggestion.indexOf(text) > -1
          @matches.push suggestion
    @updateView()

  updateView: ->
    @$('.tags-autocomplete-suggestions').html ''
    @suggestionViews = []
    for match in @matches
      view = new Tags.Views.AutoCompleteRow
        title: match
      @suggestionViews.push view
      @$('.tags-autocomplete-suggestions').append(view.render().el)
    @updateSelected()

  scrollToSelected: ->
    if @index > -1
      topPosition = @suggestionViews[0].$el.position()
      position = @suggestionViews[@index].$el.position()
      @$('.tags-autocomplete-suggestions').scrollTop position.top - topPosition.top

  updateSelected: ->
    return unless @suggestionViews.length > 0
    view.deselect() for view in @suggestionViews
    @suggestionViews[@index].select() unless @index == -1
    @scrollToSelected()

  up: ->
    @index = Math.max(0, @index - 1)
    @updateSelected()

  down: ->
    @index = Math.min(@matches.length - 1, @index + 1)
    @updateSelected()

  escape: ->
    @index = -1
    @update '', false

  delete: (text) ->
    @update text, text.length > 0

  enter: ->
    return @suggestionViews[@index].getTitle() if @index > -1
    null

  reset: ->
    @index = -1
    @update '', false

  render: ->
    @$el.html @$template()
    @