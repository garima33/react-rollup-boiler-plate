// this is the rollup plugin that adds babel as a compilation stage.
import babel from 'rollup-plugin-babel';

//Convert CommonJS modules to ES6, 
// so they can be included in a Rollup bundle
import commonjs from 'rollup-plugin-commonjs'

// Locate modules using the Node resolution algorithm,
// for using third party modules in node_modules
import nodeResolve from 'rollup-plugin-node-resolve'

// Rollup plugin to minify generated bundle.
import uglify from 'rollup-plugin-uglify'

// Replace strings in files while bundling them.
import replace from 'rollup-plugin-replace'

// Serve your rolled up bundle like webpack-dev-server
// without hot reload
import serve from 'rollup-plugin-serve'

// this will refresh the browser when detect changes in bundle.
import livereload from 'rollup-plugin-livereload'

// this will create index.html file dynamically 
// with the script tag pointing to bundle.
import htmlTemplate from 'rollup-plugin-generate-html-template';

// this will insert the styles into style tag in html
import postcss from 'rollup-plugin-postcss';


var productionConfig =
{
   input:  './src/index.js',
   output:  { 
    file: './dist/bundle.js',
    format: 'iife'
  },
   plugins:
   [
    postcss({
          extensions: [ '.css' ],
       }),
      babel({
         exclude: 'node_modules/**'
      }),
      nodeResolve({
        jsnext: true
      }),
      commonjs({
         include: 'node_modules/**',
         namedExports:
         {
            './node_modules/react/react.js': 
            [ 'cloneElement', 'createElement', 'PropTypes', 
              'Children', 'Component' ],
         }
      }),
      replace({
         'process.env.NODE_ENV': JSON.stringify( 'production' )
      }),
      uglify({
         compress: {
            screw_ie8: true,
            warnings: false
         },
         output: {
            comments: false
         },
         sourceMap: false
      })
     
   ]
}
 
var developmentConfig =
{
    input:  './src/index.js',
    output:  { 
      file: './dist/bundle.js',
    format: 'iife'
    },
   plugins:
   [
    postcss({
      extensions: [ '.css' ],
   }),
      babel({
         exclude: 'node_modules/**'
      }),
      nodeResolve({
        jsnext: true
      }),
      commonjs({
         include: 'node_modules/**',
         namedExports:
         {
            './node_modules/react/react.js':      
            [ 'cloneElement', 'createElement', 'PropTypes', 
              'Children', 'Component' ],
         }
      }),
      replace({
         'process.env.NODE_ENV': JSON.stringify( 'development' )
      }),
      serve({contentBase: 'dist',
    open: true}),
    htmlTemplate({
      template: 'src/index.html',
      target: 'dist/index.html',
    }),
    livereload({watch: 'dist',})
   ]
}
 
export default developmentConfig;