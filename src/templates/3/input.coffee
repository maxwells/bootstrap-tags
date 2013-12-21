window.Tags ||= {}
Tags.Templates ||= {}
Tags.Templates["3"] ||= {}
Tags.Templates["3"].input = (options = {}) ->
  "<input type='text' class='form-control tags-input input-#{options.tagSize}' />"