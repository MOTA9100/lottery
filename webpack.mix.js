let mix = require('laravel-mix')

mix.setPublicPath('public')

// first

mix.css('resources/css/first/app.css', 'css/first')
mix.js('resources/js/first/app.js', 'js/first')

// second

mix.css('resources/css/second/app.css', 'css/second')
mix.js('resources/js/second/app.js', 'js/second')

// second

mix.css('resources/css/third/app.css', 'css/third')
mix.js('resources/js/third/app.js', 'js/third')

// fourth

mix.css('resources/css/fourth/app.css', 'css/fourth')
mix.js('resources/js/fourth/app.js', 'js/fourth')

// fourth

mix.css('resources/css/fifth/app.css', 'css/fifth')
mix.js('resources/js/fifth/app.js', 'js/fifth')
