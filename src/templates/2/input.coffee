window.Tags ||= {}
Tags.Templates ||= {}
Tags.Templates["2"] ||= {}
Tags.Templates["2"].input = (options = {}) ->
  tagSize = switch options.tagSize
    when 'sm' then 'small'
    when 'md' then 'medium'
    when 'lg' then 'large'
  "<input type='text' class='tags-input input-#{tagSize}' />"