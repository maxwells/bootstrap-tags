# Bootstrap Tags
# Max Lahey
# Monday, November 12, 2012

jQuery ->
  $.tags = (element, options) ->

    @defaults = {}

    @suggestions = options.suggestions
    @restrictTo = (if options.restrictTo? then options.restrictTo.concat @suggestions else false)

    @$element = $ element

    # add/remove methods
    @removeTagClicked = (e) =>
      if e.target.tagName == "A"
        @removeTag e.target.previousSibling.textContent
        $(e.target.parentNode).remove()

    @removeLastTag = =>
      el = $('.tag', @$element).last()
      el.remove()
      @removeTag @tags[@tags.length-1]

    @removeTag = (tag) =>
      @tags.splice(@tags.indexOf(tag), 1)
      $('.tag-data', @$element).html @tags.join(',')
      @renderTags @tags

    @addTag = (tag) =>
      if (@restrictTo == false or @restrictTo.indexOf(tag) != -1) and $('.tag-data', @$element).html().indexOf(tag) < 0
        @tags.push tag
        $('.tag-data', @$element).html @tags.join(',')
        @renderTags @tags

    # toggles remove button color for a tag when moused over or out
    @toggleCloseColor = (e) ->
      tagAnchor = $ e.target
      color = (if tagAnchor.css('color') == "rgb(255, 255, 255)" then "#bbb" else "#fff")
      tagAnchor.css color:color 

    # Key handlers

    @keyDownHandler = (e) =>
      k = (if e.keyCode? then e.keyCode else e.which)
      switch k
        when 13 # enter
          tag = e.target.value
          if @suggestedIndex != -1
            tag = @suggestionList[@suggestedIndex]
          @addTag tag
          e.target.value = ''
          @renderTags @tags
        when 46, 8 # delete
          if e.target.value == ''
            @removeLastTag()
        when 40 # down
          if @input.val() == '' and (@suggestedIndex == -1 || !@suggestedIndex?)
            @makeSuggestions e, true
          numSuggestions = @suggestionList.length
          @suggestedIndex = (if @suggestedIndex < numSuggestions-1 then @suggestedIndex+1 else numSuggestions-1)
          @selectSuggested @suggestedIndex
        when 38 # up
          @suggestedIndex = (if @suggestedIndex > 0 then @suggestedIndex-1 else 0)
          @selectSuggested @suggestedIndex
        else

    @makeSuggestions = (e, overrideLengthCheck) =>
      val = (if e.target.value? then e.target.value else e.target.textContent)
      @suggestedIndex = -1
      @$suggestionList.html ''
      @suggestionList = []
      $.each @suggestions, (i, suggestion) =>
        if suggestion.substring(0, val.length) == val and (val.length > 0 or overrideLengthCheck)
          @$suggestionList.append '<li class="tags-suggestion">'+suggestion+'</li>'
          @suggestionList.push suggestion
      $('.tags-suggestion', @$element).mouseover @selectSuggestedMouseOver
      $('.tags-suggestion', @$element).click @suggestedClicked

    @suggestedClicked = (e) =>
      tag = e.target.textContent
      if @suggestedIndex != -1
        tag = @suggestionList[@suggestedIndex]
      @addTag tag
      @input.val ''
      @makeSuggestions e, false

    @keyUpHandler = (e) =>
      k = (if e.keyCode? then e.keyCode else e.which)
      if (k != 40 and k != 38)
        @makeSuggestions e, false

    # display methods
    @selectSuggestedMouseOver = (e) =>
      $('.tags-suggestion').removeClass('tags-suggestion-highlighted')
      $(e.target).addClass('tags-suggestion-highlighted')
      $(e.target).mouseout @selectSuggestedMousedOut
      @suggestedIndex = $('.tags-suggestion', @$element).index($(e.target))

    @selectSuggestedMousedOut = (e) =>
      $(e.target).removeClass('tags-suggestion-highlighted')

    @selectSuggested = (i) => # shows the provided index of suggestion list for this element as highlighted (exclusion of others)
      $('.tags-suggestion').removeClass('tags-suggestion-highlighted')
      tagElement = $('.tags-suggestion', @$element).eq(i)
      tagElement.addClass 'tags-suggestion-highlighted'

    # adjust padding on input so that what user types shows up next to last tag (or on new line if insufficient space)
    @adjustInputPosition = =>
      tagElement = $('.tag', @$element).last()
      tagPosition = tagElement.position()
      pLeft = if tagPosition? then tagPosition.left + tagElement.width() else 0
      pTop = if tagPosition? then tagPosition.top else 0
      $('.tags-input', @$element).css
        paddingLeft : pLeft
        paddingTop  : pTop
      pBottom = if tagPosition? then tagPosition.top + tagElement.outerHeight() else 20  
      @$element.css height : pBottom

    @renderTags = (tags) =>
      el = $('.tags',@$element)
      el.html('')
      $.each tags, (i, tag) =>
        tag = $(@formatTag i, tag)
        # tag.on "click", @alert
        $('a', tag).on "click", @removeTagClicked
        $('a', tag).on "mouseover", @toggleCloseColor
        $('a', tag).on "mouseout", @toggleCloseColor
        el.append tag
      @adjustInputPosition()

    @formatTag = (i, tag) ->
      markup = "<div id='tag_"+i+"' class='tag'><span id='label_tag_"+i+"' class='label label-inverse'>"+tag+"<a id='close_tag_"+i+"'> X</a></span></div>"

    @init = ->
      @tags = $('.tag-data', @$element).html().split ','
      @input = $ "<input class='tags-input'>"
      @$element.append @input
      @$suggestionList = $ '<ul class="tags-suggestion-list"></ul>'
      @$element.append @$suggestionList
      @renderTags @tags
      @input.keydown @keyDownHandler
      @input.keyup @keyUpHandler
      
    @init()

    @

  $.fn.tags = (options) ->
    return this.each ->
      tags = new $.tags this, options