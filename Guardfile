guard 'rake', :task => 'minify' do
  watch /lib\/bootstrap-tags.js/
end

# guard 'rake', :task => 'spec' do
#   watch /spec\/*.coffee/
# end

guard 'sprockets', :destination => 'lib', :asset_paths => ['src', 'src/templates'], :root_file => 'src/bootstrap-tags.js.coffee' do
  watch 'src/bootstrap-tags.js.coffee'
  watch 'src/events.js.coffee'
  (Dir.glob('src/templates/*.eco') & Dir.glob('src/models/*.coffee') & Dir.glob('src/views/*.coffee')).each do |e|
    watch e
  end
end
