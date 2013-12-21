newTagger = (id, options) ->
  $('body').append("<div id='#{id}' class='tagger'></div>")
  $("##{id}").tags options

describe "Bootstrap Tags", ->

  afterEach ->
    $('.tagger').remove()

  describe "when using readOnly", ->

    beforeEach ->
      @initTagData = ['one', 'two', 'three']
      @tags = newTagger "tagger",
        tagData: @initTagData
        readOnly: true

    it "can't add tags", ->
      tagLength = @tags.getTags().length
      @tags.addTag('new tag')
      expect(@tags.getTags().length).toEqual tagLength

    it "can't remove tags", ->
      tagLength = @tags.getTags().length
      @tags.removeTag('one')
      expect(@tags.hasTag('one')).toBeTruthy()

    it "can't rename tag", ->
      @tags.renameTag('one', 'new name')
      expect(@tags.hasTag('new name')).toBeFalsy()
      expect(@tags.hasTag('one')).toBeTruthy()

    it "can get the list of tags", -> 
      expect(@tags.getTags()).toEqual @initTagData

    describe "when no tags are provided", ->

      beforeEach ->
        @$domElement = $('body').append '<div id="tagger2" class="tagger"></div>'

      it "sets readOnlyEmptyMessage to tags body if provided", ->
        @tags = $('#tagger2').tags
          readOnly: true
          readOnlyEmptyMessage: "foo"
        expect($('#tagger2 .tags', @$domElement).html()).toEqual "foo"

      it "sets default empty message to tags body if readOnlyEmptyMessage is not provided", ->
        @tags = $('#tagger2').tags
          readOnly: true
        expect($('#tagger2 .tags').html()).toEqual $('#tagger2').tags().readOnlyEmptyMessage

  describe "when normally operating", ->

    beforeEach ->
      @$domElement = $('body').append '<div id="tagger" class="tag-list"><div class="tags"></div></div>'
      @initTagData = ['one', 'two', 'three']
      @tags = $('#tagger', @$domElement).tags
        tagData: @initTagData

    afterEach ->
      $('#tagger').remove()

    it "can add tag", ->
      tagLength = @tags.getTags().length
      @tags.addTag('new tag')
      expect(@tags.getTags().length).toEqual tagLength + 1
      expect(@tags.hasTag('new tag')).toBeTruthy()

    it "can get the list of tags", ->
      expect(@tags.getTags()).toEqual @initTagData

    it "can remove tag, specified by string", ->
      expect(@tags.hasTag('one')).toBeTruthy()
      @tags.removeTag('one')
      expect(@tags.hasTag('one')).toBeFalsy()

    it "can remove the last tag", ->
      tagList = @tags.getTags()
      lastTag = tagList[tagList.length-1]
      @tags.removeLastTag()
      expect(@tags.hasTag(lastTag)).toBeFalsy()

    it "can add tag with popover content", ->
      @tags.addTagWithContent('new tag', 'new content')
      tagsWithContent = @tags.getTagsWithContent()
      console.log tagsWithContent
      expect(tagsWithContent[tagsWithContent.length-1].content).toEqual 'new content'

    it "can change the popover content for a tag", ->
      content = 'new tag content for the first tag'
      @tags.setPopover('one', content)
      expect(@tags.getTagWithContent('one').content).toEqual content

    it "can rename tag", ->
      @tags.renameTag('one', 'new name')
      expect(@tags.hasTag('new name')).toBeTruthy()
      expect(@tags.hasTag('one')).toBeFalsy()

    describe "when provided with a tagClass option", ->

      it "uses it to style tags", ->
        $('body').append '<div id="tagger2" class="tag-list"></div>'
        tags = $('#tagger2').tags
          tagClass: "btn-warning"
          tagData: ["a", "b"]
        expect($('#tagger2 .tag').hasClass("btn-warning")).toBeTruthy()
        $('#tagger2').remove()

    describe "when provided a tagSize option", ->

    describe "when providing before/after adding/deleting callbacks", ->

      beforeEach ->
        $('body').append '<div id="tagger2" class="tag-list"></div>'

      afterEach ->
        $('#tagger2').remove()

      describe "when adding tags", ->

        it "calls beforeAddingTag before a tag is added, providing the tag as first parameter", ->
          wasCalled = false
          tagAdded = "not this"
          tags = $('#tagger2').tags
            beforeAddingTag: (tag) ->
              wasCalled = true
              tagAdded = tag
          tags.addTag "this"
          expect(wasCalled and tagAdded == "this").toBeTruthy()

        it "will not add a tag if beforeAddingTag returns false", ->
          tags = $('#tagger2').tags
            beforeAddingTag: (tag) ->
              false
          tags.addTag "this"
          expect(tags.getTags()).toEqual []

        it "calls afterAddingTag after a tag is added, providing the tag as first parameter", ->
          wasCalled = false
          tagAdded = "not this"
          tags = $('#tagger2').tags
            afterAddingTag: (tag) ->
              wasCalled = true
              tagAdded = tag
          tags.addTag "this"
          expect(wasCalled and tagAdded == "this").toBeTruthy()

      describe "when deleting tags", ->

        it "calls beforeDeletingTag before a tag is removed, providing the tag as first parameter", ->
          wasCalled = false
          tags = $('#tagger2').tags
            tagData: ["a", "b", "c"]
            beforeDeletingTag: (tag) ->
              wasCalled = true
              expect(tag).toEqual("a")
          tags.removeTag "a"
          expect(wasCalled).toBeTruthy()

        it "will not add a tag if beforeDeletingTag returns false", ->
          tags = $('#tagger2').tags
            tagData: ["a", "b", "c"]
            beforeDeletingTag: (tag) ->
              false
          tags.removeTag "a"
          expect(tags.getTags()).toEqual ["a", "b", "c"]

        it "calls afterDeletingTag after a tag is removed, providing the tag as first parameter", ->
          wasCalled = false
          tags = $('#tagger2').tags
            tagData: ["a", "b", "c"]
            afterDeletingTag: (tag) ->
              wasCalled = true
              expect(tag).toEqual("a")
          tags.removeTag "a"
          expect(wasCalled).toBeTruthy()

    describe "when restricting tags using restrictTo option", ->

      it "will not add any tags that aren't approved", ->
        $('body').append '<div id="tagger2" class="tag-list"></div>'
        tags = $('#tagger2').tags
          restrictTo: ["a", "b", "c"]
        tags.addTag('foo').addTag('bar').addTag('baz').addTag('a')
        expect(tags.getTags()).toEqual ['a']
        $('#tagger2').remove()

    describe "when providing exclusion options", ->

      it "can exclude tags via the excludes function option", ->
        $domElement = $('body').append '<div id="tagger2" class="tag-list"><div class="tags"></div></div>'
        excludesFunction = (tag) ->
          return false if tag.indexOf('foo') > -1
          true
        tags = $('#tagger2', @$domElement).tags
          excludes: excludesFunction
        tags.addTag('foo').addTag('bar').addTag('baz').addTag('foobarbaz')
        expect(tags.getTags()).toEqual ['foo', 'foobarbaz']
        $('#tagger2').remove()

      it "can exclude tags via the exclude option", ->
        $domElement = $('body').append '<div id="tagger2" class="tag-list"><div class="tags"></div></div>'
        tags = $('#tagger2', @$domElement).tags
          exclude: ["a", "b", "c"]
        tags.addTag('a').addTag('b').addTag('c').addTag('d')
        expect(tags.getTags()).toEqual ['d']
        $('#tagger2').remove()