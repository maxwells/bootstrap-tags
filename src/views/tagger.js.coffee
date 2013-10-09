class Tags.Views.Tagger extends Tags.Views.Base
  template: JST["templates/tagger"]

  # Default options
  defaultOptions:
    readOnly: false
    suggestions: []
    restrictTo: []
    exclude: []
    displayPopovers: false
    popoverTrigger: 'hover'
    tagClass: 'btn-info'
    promptText: 'Enter tags...'
    readOnlyEmptyMessage: 'No tags to display...'

    labelClass: 'label-default'

    beforeAddingTag: ->
    afterAddingTag: ->
    beforeDeletingTag: ->
    afterDeletingTag: ->

    excludesTags: -> false
    onTagRemoved: ->

  constructor: (element, options = {}) ->
    super()
    @$el = $(element)

    @tagsCollection = new Tags.Models.TagsCollection
    @tagViews = []

    # generate instance options from cloned defaults merged in with construction options
    $.extend @options = {}, @defaultOptions, options

    @render()

  updateOptions: (options = {}) ->
    # merge options into instance options
    $.extend @options, options
    @

  addTag: (tagName) ->
    model = @tagsCollection.create tagName
    tagView = new Tags.Views.Tag(model: model)
    tagView.on "destroyed", @removeTagByModel, @
    @tagViews.push(tagView)
    @renderTag(tagView)
    @

  # takes a Models.Tag object, removes it from the TagsCollection
  # and removes any Views.Tag whose model matches it
  removeTagByModel: (model) ->
    indicesToDelete = []

    for tagView, i in @tagViews
      indicesToDelete.unshift i if tagView.model == model

    @removeTagView(@tagViews[index]) for index in indicesToDelete
    @tagsCollection.removeModel model

  removeTagView: (tagViewToRemove) ->
    @$(tagViewToRemove.el).remove()
    @updateTextInputPosition()
    for tagView, i in @tagViews
      return @tagViews.splice i, 1 if tagView == tagViewToRemove

  # remove tag by name
  # --> removes all models (and views) matching that tag name
  removeTag: (tagName) ->
    models = @tagsCollection.remove(tagName)
    @removeTagByModel(model) for model in models
    @

  renderTag: (tagView) ->
    @$('.tags').append tagView.render(labelClass: @options.labelClass).el
    @updateTextInputPosition()
    
  renderTags: ->
    for tagView in @tagViews
      @renderTag(tagView)
    @

  getTags: ->
    @tagsCollection.getTags()

  updateTextInputPosition: ->
    @$('input').css
      'padding-left': @$('.tags').outerWidth()

  keyDownHandler: (e) =>
    k = (if e.keyCode? then e.keyCode else e.which)
    switch k
      when 13 # enter (submit tag or selected suggestion)
        @addTag @autoComplete.enter() or e.target.value
        @autoComplete.reset()
        @$('.tags-input').val ''
      when 46, 8 # delete
        if e.target.value == ''
          @removeTagView(@tagViews[@tagViews.length-1])
      when 40
        @autoComplete.down()
      when 38
        @autoComplete.up()
      when 27
        @autoComplete.escape()
  
  keyUpHandler: (e) =>
    k = (if e.keyCode? then e.keyCode else e.which)
    switch k
      when 27, 13
        break
      when 46, 8 # delete
        @autoComplete.delete e.target.value
      else
        @autoComplete.update e.target.value

  setupListeners: ->
    @$('.tags-input').keydown @keyDownHandler
    @$('.tags-input').keyup @keyUpHandler

  initializeAutoComplete: ->
    @autoComplete = new Tags.Views.AutoComplete
      suggestions: @options.suggestions
    @$('.tagger').append @autoComplete.render().el

  render: ->
    @$el.html @$template @
    @renderTags()
    @setupListeners()
    @initializeAutoComplete()
    @