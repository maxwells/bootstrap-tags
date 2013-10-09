class BaseView extends Events
  tagName: 'div'
  classes: ''

  constructor: (options = {}) ->
    @options = options
    @$el = $("<#{@tagName} class='#{@classes}'></#{@tagName}>")
    @el = @$el[0]
    @initialize(options) if @initialize?

  $: (selector) ->
    @$el.find selector

  $template: (o) ->
    $(@template(o))

window.Tags ||= {}
window.Tags.Views = Base: BaseView