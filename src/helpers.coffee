window.Tags ||= {}
Tags.Helpers ||= {}

Tags.Helpers.addPadding = (string, amount = 1, doPadding = true) ->
  return string unless doPadding
  return string if amount == 0
  Tags.Helpers.addPadding("&nbsp#{string}&nbsp", amount - 1)