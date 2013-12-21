window.Tags ||= {}
Tags.Templates ||= {}
Tags.Templates.Template = (version, templateName, options) ->
  if Tags.Templates[version]?
    return Tags.Templates[version][templateName](options) if Tags.Templates[version][templateName]?
  Tags.Templates.shared[templateName](options)