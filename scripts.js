/*
 <option value="javascript">JavaScript</option>
 <option value="ruby">Ruby</option>
 <option value="sql">SQL</option>
 <option value="java">Java</option>
 <option value="css">CSS</option>
 <option value="scss">SCSS</option>
 <option value="scala">Scala</option>
 <option value="php">PHP</option>
 <option value="coffee">CoffeeScript</option>
 <option value="html">HTML/ERB</option>
 */
var MODES = {
  javascript: {
    hljs: "js",
    cm: "javascript"
  },
  ruby: {
    hljs: "ruby",
    cm: "ruby"
  },
  sql: {
    hljs: "sql",
    cm: "sql"
  },
  java: {
    hljs: "java",
    cm: "text/x-java"
  },
  css: {
    hljs: "css",
    cm: "css"
  },
  scss: {
    hljs: "scss",
    cm: "text/x-css"
  },
  scala: {
    hljs: "scala",
    cm: "text/x-scala"
  },
  php: {
    hljs: "php",
    cm: "text/x-php"
  },
  coffee: {
    hljs: "coffeescript",
    cm: "text/x-coffeescript"
  },
  html: {
    hljs: "html",
    cm: {
      name: "htmlmixed",
      //scriptTypes: [{
      //  matches: /\/x-handlebars-template|\/x-mustache/i,
      //  mode: null
      //}, {
      //  matches: /(text|application)\/(x-)?vb(a|script)/i,
      //  mode: "vbscript"
      //}]
    }
  },
  erb: {
    hljs: "erb",
    cm: "application/x-erb"
  }
};

var $input = $(".input");
var $preview = $(".preview");
var $language = $(".language-select");

$preview.text($input.val());

hljs.configure({
  tabReplace: ' '
});

var update = _.debounce(function update() {
  hljs.highlightBlock($preview[0]);
}, 100);

var editor = CodeMirror.fromTextArea($input[0], {
  lineNumbers: true,
  mode: "javascript",
  indentUnit: 1,
  tabSize: 1
});

editor.on('change', function (doc, e) {
  $preview.text(doc.getValue());
  update();
});

update();

$preview.on('click', function() {
  window.getSelection().selectAllChildren(this);
});

$language.on('change', function() {
  var mode = MODES[$language.val()];
  $preview
    .attr('class','')
    .addClass('preview')
    .addClass(mode.hljs);
  editor.setOption("mode", mode.cm);
});
