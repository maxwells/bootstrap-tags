newTagger = (id, options) ->
  $('body').append("<div id='#{id}' class='tagger'></div>")
  $("##{id}").tags options

describe "Bootstrap Tags", ->

  afterEach ->
    $('.tagger').remove()

  it "defaults to bootstrap 3", ->
    tags = newTagger "tagger2"
    expect(tags.bootstrapVersion).toEqual "3"

  describe "when templating", ->

    it "uses appropriate version", ->
      tags = newTagger "tagger2",
        bootstrapVersion: "2"
      tagsInputHtml = tags.template "input", tagSize: "sm"
      version2Html = Tags.Templates["2"].input tagSize: "sm"
      expect(tagsInputHtml).toEqual version2Html

    it "defaults to shared when template by name is not available in a version", ->
      tags = newTagger "tagger2",
        bootstrapVersion: "2"
      tagsInputHtml = tags.template "suggestion_list"
      version2Html = Tags.Templates.shared.suggestion_list()
      expect(tagsInputHtml).toEqual version2Html

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

      it "sets readOnlyEmptyMessage to tags body if provided", ->
        @tags = newTagger "tagger2",
          readOnly: true
          readOnlyEmptyMessage: "foo"
        expect($('#tagger2 .tags', @$domElement).html()).toEqual "foo"

      it "sets default empty message to tags body if readOnlyEmptyMessage is not provided", ->
        @tags = newTagger "tagger2",
          readOnly: true
        expect($('#tagger2 .tags').html()).toEqual $('#tagger2').tags().readOnlyEmptyMessage

  describe "when normally operating", ->

    beforeEach ->
      @initTagData = ['one', 'two', 'three']
      @tags = newTagger "tagger",
        tagData: @initTagData

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
      expect(tagsWithContent[tagsWithContent.length-1].content).toEqual 'new content'

    it "can change the popover content for a tag", ->
      content = 'new tag content for the first tag'
      @tags.setPopover('one', content)
      expect(@tags.getTagWithContent('one').content).toEqual content

    it "can rename tag", ->
      @tags.renameTag('one', 'new name')
      expect(@tags.hasTag('new name')).toBeTruthy()
      expect(@tags.hasTag('one')).toBeFalsy()

    it "can getTagWithContent", ->
      @tags.addTagWithContent('new tag', 'new content')
      expect(@tags.getTagWithContent('new tag').content).toEqual 'new content'

    describe "when defining popover for an existing tag", ->

      it "should set the associated content", ->
        tags = newTagger "tagger2",
          definePopover: (tag) ->
            "popover for #{tag}"
        tags.addTag("foo")
        expect(tags.getTagWithContent("foo").content).toEqual "popover for foo"

    describe "when provided a promptText option", ->

      it "applies it to the input placeholder when there are no tags", ->
        tags = newTagger "tagger2",
          promptText: "foo"
        expect($("#tagger2 input").attr("placeholder")).toEqual "foo"

      it "does not apply it to input placeholder when there are tags", ->
        tags = newTagger "tagger2",
          promptText: "foo"
          tagData: ["one"]
        expect($("#tagger2 input").attr("placeholder")).toEqual ""

    describe "when provided with a tagClass option", ->

      it "uses it to style tags", ->
        @tags = newTagger "tagger2",
          tagClass: "btn-warning"
          tagData: ["a", "b"]
        expect($('#tagger2 .tag').hasClass("btn-warning")).toBeTruthy()

    describe "when provided a tagSize option", ->

      it "defaults to md", ->
        tags = newTagger "tagger2", {}
        expect(tags.tagSize).toEqual("md")

      it "applies it to tags", ->
        tags = newTagger "tagger2",
          tagSize: "sm"
          tagData: ["one", "two"]
        expect($("#tagger2 .tag").hasClass("sm")).toBeTruthy()

      it "applies it to input", ->
        tags = newTagger "tagger2",
          tagSize: "lg"
        expect($("#tagger2 input").hasClass("input-lg")).toBeTruthy()

    describe "when providing before/after adding/deleting callbacks", ->

      describe "when adding tags", ->

        it "calls beforeAddingTag before a tag is added, providing the tag as first parameter", ->
          wasCalled = false
          tagAdded = "not this"
          tags = newTagger "tagger2",
            beforeAddingTag: (tag) ->
              wasCalled = true
              tagAdded = tag
          tags.addTag "this"
          expect(wasCalled and tagAdded == "this").toBeTruthy()

        it "will not add a tag if beforeAddingTag returns false", ->
          tags = newTagger "tagger2",
            beforeAddingTag: (tag) ->
              false
          tags.addTag "this"
          expect(tags.getTags()).toEqual []

        it "calls afterAddingTag after a tag is added, providing the tag as first parameter", ->
          wasCalled = false
          tagAdded = "not this"
          tags = newTagger "tagger2",
            afterAddingTag: (tag) ->
              wasCalled = true
              tagAdded = tag
          tags.addTag "this"
          expect(wasCalled and tagAdded == "this").toBeTruthy()

      describe "when deleting tags", ->

        it "calls beforeDeletingTag before a tag is removed, providing the tag as first parameter", ->
          wasCalled = false
          tags = newTagger "tagger2",
            tagData: ["a", "b", "c"]
            beforeDeletingTag: (tag) ->
              wasCalled = true
              expect(tag).toEqual("a")
          tags.removeTag "a"
          expect(wasCalled).toBeTruthy()

        it "will not add a tag if beforeDeletingTag returns false", ->
          tags = newTagger "tagger2",
            tagData: ["a", "b", "c"]
            beforeDeletingTag: (tag) ->
              false
          tags.removeTag "a"
          expect(tags.getTags()).toEqual ["a", "b", "c"]

        it "calls afterDeletingTag after a tag is removed, providing the tag as first parameter", ->
          wasCalled = false
          tags = newTagger "tagger2",
            tagData: ["a", "b", "c"]
            afterDeletingTag: (tag) ->
              wasCalled = true
              expect(tag).toEqual("a")
          tags.removeTag "a"
          expect(wasCalled).toBeTruthy()

    describe "when restricting tags using restrictTo option", ->

      it "will not add any tags that aren't approved", ->
        tags = newTagger "tagger2",
          restrictTo: ["a", "b", "c"]
        tags.addTag('foo').addTag('bar').addTag('baz').addTag('a')
        expect(tags.getTags()).toEqual ['a']
        $('#tagger2').remove()

    describe "when providing exclusion options", ->

      it "can exclude tags via the excludes function option", ->
        excludesFunction = (tag) ->
          return false if tag.indexOf('foo') > -1
          true
        tags = newTagger "tagger2",
          excludes: excludesFunction
        tags.addTag('foo').addTag('bar').addTag('baz').addTag('foobarbaz')
        expect(tags.getTags()).toEqual ['foo', 'foobarbaz']
        $('#tagger2').remove()

      it "can exclude tags via the exclude option", ->
        tags = newTagger "tagger2",
          exclude: ["a", "b", "c"]
        tags.addTag('a').addTag('b').addTag('c').addTag('d')
        expect(tags.getTags()).toEqual ['d']
        $('#tagger2').remove()

    describe "when auto-suggesting", ->

      describe "and caseInsensitive is true", ->

        it "finds suggestion regardless of case", ->
          tags = newTagger "tagger2",
            caseInsensitive: true
            suggestions: ["alpha", "bravo", "charlie"]
          expect(tags.getSuggestions("A", true)).toEqual ["alpha"]

      describe "and caseInsensitive is false", ->

        it "only finds suggestions that match case", ->
          tags = newTagger "tagger2",
            suggestions: ["alpha", "bravo", "charlie"]
          expect(tags.getSuggestions("A", true)).toEqual []
          expect(tags.getSuggestions("b", true)).toEqual ["bravo"]