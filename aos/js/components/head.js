

var headHTML ='<meta charset="utf-8">';
    headHTML +='<title>'+viewConfig.view+' '+viewConfig.type+'</title>';
    headHTML +='<meta name="description" content="">';
    headHTML +='<meta name="viewport" content="width=device-width, initial-scale=1">';
    headHTML +='<meta property="og:title" content="">';
    headHTML +='<meta property="og:type" content="">';
    headHTML +='<meta property="og:url" content="">';
    headHTML +='<meta property="og:image" content="">';
    headHTML +='<link rel="manifest" href="site.webmanifest">';
    headHTML +='<link rel="apple-touch-icon" href="icon.png">';
    headHTML +='<link rel="stylesheet" href="css/normalize.css">';
    headHTML +='<meta name="theme-color" content="#fafafa">';
    headHTML +='<link rel="stylesheet" href="'+viewConfig.dpath+'/js/vendor/simple_grid/simple-grid.css">';
    headHTML +='<link rel="stylesheet" type="text/css" href="'+viewConfig.dpath+'/js/vendor/slimmenu/dist/css/slimmenu.min.css"/>';
    if(viewConfig.view == 'overview'){
        headHTML +='<link rel="stylesheet" href="'+viewConfig.urlRoot+'/home/js/vendor/reveal_js/dist/reset.css">';
        headHTML +='<link rel="stylesheet" href="'+viewConfig.urlRoot+'/home/js/vendor/reveal_js/dist/reveal.css">';
        headHTML +='<link rel="stylesheet" href="'+viewConfig.urlRoot+'/home/js/vendor/reveal_js/dist/theme/black.css" id="theme">';
        //headHTML +='<link rel="stylesheet" href="'+viewConfig.urlRoot+'/home/js/vendor/reveal_js/plugin/highlight/monokai.css" id="highlight-theme">';
        headHTML +='<script src="'+viewConfig.urlRoot+'/home/js/vendor/reveal_js/dist/reveal.js"></script>';
        headHTML +='<script src="'+viewConfig.urlRoot+'/home/js/vendor/reveal_js/plugin/notes/notes.js"></script>';
        headHTML +='<script src="'+viewConfig.urlRoot+'/home/js/vendor/reveal_js/plugin/markdown/markdown.js"></script>';
        headHTML +='<script src="'+viewConfig.urlRoot+'/home/js/vendor/reveal_js/plugin/highlight/highlight.js"></script>';
    }
    if(viewConfig.view == 'adminList'){
        headHTML +='<script src="'+viewConfig.urlRoot+'/home/js/vendor/list.min.js"></script>';
    }
    headHTML +='<link rel="stylesheet" href="css/main.css">';
    headHTML +='<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>';
    headHTML +='<script src="'+viewConfig.dpath+'/js/helper.js"></script>';
    headHTML +='<link rel="stylesheet" href="'+viewConfig.urlRoot+'/home/css/header.css">';
    headHTML +='<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,100&family=Quicksand:wght@500&display=swap" rel="stylesheet">';
    headHTML +='<link rel="stylesheet" href="'+viewConfig.urlRoot+'/home/css/aos.css">';
    headHTML +='<link rel="stylesheet" href="'+viewConfig.urlRoot+'/home/css/'+viewConfig.view+'.css">';
    
$('head').append(headHTML);

