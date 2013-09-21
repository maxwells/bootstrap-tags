require 'closure-compiler'

task :spec do
  `coffee --output spec --compile spec/bootstrap-tags-spec.coffee`
end

task :minify do
  src_files = File.join("lib", "bootstrap-tags.js")
  Dir.glob(src_files).each do |src_file|
    minified_f = "lib/#{File.basename(src_file, '.js')}.min.js"
    puts "Compressing #{src_file} to #{minified_f}"
    File.open(minified_f, 'wb') do |f|
      f.write Closure::Compiler.new.compile(File.open(src_file, 'r'))
    end
    
  end
end

task :default => [:compile, :spec]