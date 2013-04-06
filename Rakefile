task :compile do
  `coffee --output lib --compile src/bootstrap-tags.coffee`
end

task :spec do
  `coffee --output spec --compile spec/bootstrap-tags-spec.coffee`
end

task :default => [:compile, :spec]