class BaseView extends Events
  tagName: 'div'
  classes: ''

  constructor: ->
    @$el = $("<#{@tagName} class='#{@classes}'></#{@tagName}>")
    @el = @$el[0]

  $: (selector) ->
    @$el.find selector

  $template: (o) ->
    $(@template(o))

window.Tags ||= {}
window.Tags.Views = Base: BaseView