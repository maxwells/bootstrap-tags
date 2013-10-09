describe "Bootstrap Tags", ->

  beforeEach ->
    $('body').append '<div id="#one"></div>'
    @tags = $("#one").tags()

  afterEach ->
    $("#one").remove()

  it "can be tested", ->
    expect(true).toBeTruthy()

  it "loads jQuery", ->
    $('#one')

  describe "getTags method", ->

    it "returns an empty array when there are no tags", ->
      expect($("#one").tags().getTags()).toEqual []

    it "returns an array with a single element when there is a single tag", ->
      expect($("#one").tags().addTag("hello").getTags()).toEqual ["hello"]
      $("#one").tags().removeTag("hello")