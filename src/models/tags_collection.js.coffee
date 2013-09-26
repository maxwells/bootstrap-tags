class Tags.Models.TagsCollection

  constructor: (models) ->
    @tags = models or []

  each: (fn) ->
    for tag in @tags
      fn(tag)

  create: (tagName) ->
    model = new Tags.Models.Tag(tagName)
    @tags.push(model)
    model

  remove: (tagName) ->
    newTags = []
    removedTags = []
    @each (tag) ->
      if tag.name == tagName
        removedTags.push tag
      else
        newTags.push tag 
    @tags = newTags
    removedTags

  removeModel: (model) ->
    for tag, i in @tags
      @tags.splice i, 1 if tag == model

  getTags: ->
    @each (tag) ->
      tag.name