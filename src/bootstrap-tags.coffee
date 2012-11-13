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

    @removeLastTag = =>
      el = $('.tag', @$element).last()
      el.remove()
      @removeTag @tags[@tags.length-1]

    @removeTag = (tag) =>
      @tags.splice(@tags.indexOf(tag), 1)
      $('.tag-data', @$element).html @tags.join(',')
      @renderTags @tags

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
      @positionInput()

    @keyHandler = (e) =>
      k = (if e.keyCode? then e.keyCode else e.which)
      if k == 13
        @addTag e.target.value
        e.target.value = ''
        @renderTags @tags
      else if k == 46 or k == 8
        if e.target.value == ''
          @removeLastTag()

    @positionInput = =>
      tagElement = $('.tag', @$element).last()
      tagPosition = tagElement.position()
      pLeft = if tagPosition? then tagPosition.left + tagElement.width() else 0
      pTop = if tagPosition? then tagPosition.top else 0
      $('.tags-input', @$element).css
        paddingLeft : pLeft
        paddingTop  : pTop

    @formatTag = (i, tag) ->
      markup = "<div id='tag_"+i+"' class='tag'><span id='label_tag_"+i+"' class='label label-info'>"+tag+"<a id='close_tag_"+i+"'> X</a></span></div>"

    @setListeners = ->
      #@$element.on "click", @alert

    @init = ->
      @tags = $('.tag-data', @$element).html().split ','
      input = @$element.append "<input class='tags-input'>"
      @renderTags @tags
      input.keydown @keyHandler
      @setListeners()
      
    @init()

    this

  $.fn.tags = (options) ->
    return this.each ->
      tags = new $.tags this, options