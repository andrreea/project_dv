requi re 'compass/i mport-once/activate
# Requi re any additional compass plugins here
# Set this to the root of your projec w en de loyed: http—path = css—dir = i'stylesheets" sass_dir — sass " images—dir = "images
" javasgrjp ts '
# You can seiect youF preferred output style here (can be overridden via the command line).
# output_style— : expanded or : nested or : compact or : compressed
# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets — true
# To disable debugging comments that display the original location of your selectors. Uncomment: # line_comments = false
If you prefer the indented syntax, you might want to regenerate this project again passing --syntax sass, or you can uncomment this: p referred_syntax = : sass and then run:
sass-convert -R --from scss j --to sass sass scss && rm -rf sass && mv scss sass