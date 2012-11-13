# Bootstrap Tags
# Max Lahey
# Monday, November 12, 2012

jQuery ->
  $.tags = (element, options) ->

    @defaults = {}

    @$element = $ element

    @removeTagClicked = (e) =>
      if e.target.tagName == "A"
        $(e.target.parentNode).remove()
        @removeTag e.target.previousSibling.textContent

    @removeTag = (tag) =>
      @tags.splice(@tags.indexOf(tag), 1)
      $('.tag-data', @$element).html @tags.join(',')

    @addTag = (tag) =>
      @tags.push tag
      $('.tag-data', @$element).html @tags.join(',')
      @renderTags @tags

    @renderTags = (tags) =>
      el = $('.tags',@$element)
      el.html('')
      $.each tags, (i, tag) =>
        tag = $(@formatTag i, tag)
        # tag.on "click", @alert
        $('a', tag).on "click", @removeTagClicked
        el.append tag

    @keyHandler = (e) =>
      if e.which == 13
        @addTag e.target.value
        e.target.value = ''
        @renderTags @tags
      else if e.which == 46
        if e.target.value == ''
          alert @tags[@tags.length-1]
          @removeTag @tags[@tags.length-1]

    @formatTag = (i, tag) ->
      markup = "<div id='tag_"+i+"' class='tag'><span id='label_tag_"+i+"'>"+tag+"</span><a id='close_tag_"+i+"'>X</a></div>"

    @setListeners = ->
      #@$element.on "click", @alert

    @init = ->
      @tags = $('.tag-data', @$element).html().split ','
      input = @$element.append "<input class='tags-input'>"
      @renderTags @tags
      input.keypress @keyHandler
      @setListeners()
      
    @init()

    this

  $.fn.tags = (options) ->
    return this.each ->
      tags = new $.tags this, options