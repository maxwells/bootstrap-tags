window.Tags ||= {}
Tags.Templates ||= {}
Tags.Templates.shared ||= {}
Tags.Templates.shared.tags_suggestion = (options = {}) ->
  "<li class='tags-suggestion'>#{options.suggestion}</li>"