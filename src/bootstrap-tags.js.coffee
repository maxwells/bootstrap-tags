# Bootstrap Tags
# Flat UI (Bootstrap 3.x+)
# Max Lahey
# September, 2013

#= require events
#= require_tree ./templates
#= require_tree ./models
#= require ./views/base
#= require_tree ./views


# Issues:
# 1) What is the best interface to provide for tag persistence, whether it be frameworkless, backbone, ember, angular, etc
# 2) styling...
# 3) maybe specific types of code should be factored out into concern like modules
# 4) 

class TaggerCollection
  constructor: (items) ->
    @items = items

  for key, value of Tags.Views.Tagger.prototype
    do (key, value) =>
      @prototype[key] = ->
        returnVals = []
        for element in @items
          returnVals.push value.apply($(element).data('tags'), arguments)
        return @ if returnVals[0] instanceof Tags.Views.Tagger
        if @items.length > 1 then returnVals else returnVals[0]

# jQuery plugin portion
#
(($, window, document) ->

  $.fn.tags = (options) ->
    #   new Tagger(options)
    @each (i, el) ->
      $el = $(el)
      unless $el.data('tags')?
        $el.data 'tags', new Tags.Views.Tagger(el, options)
      else
        $el.data('tags').updateOptions options
    new TaggerCollection(@)


)($, window, document)