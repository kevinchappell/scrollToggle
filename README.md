[![Code Climate](https://codeclimate.com/github/kevinchappell/scrollToggle/badges/gpa.svg)](https://codeclimate.com/github/kevinchappell/scrollToggle)
# scroll-toggle #

A jQuery plugin for making sticky mobile menus that toggle themselves accordnig to the user's scrolling. User scrolls down the top menu hides itself. Scrolling up reveals the menu again.

Has support for bottom or top stickiness.

## [Demo](http://kevinchappell.github.io/scrollToggle)
## [Used by Flipboard!](https://about.flipboard.com/)

## Installation
```
<link rel="stylesheet" href="path/to/scroll-toggle.min.css">
<script src="path/to/scroll-toggle.min.js"></script>
```

## Usage
```
  jQuery(document).ready(function() {
    $('header').scrollToggle();
    $('footer').scrollToggle({stick: 'bottom'});
  });
```

## Development
All contributions are welcome and there is even a build script to help aid your development.

Get Started with this one-liner: ```git clone git@github.com:kevinchappell/scrollToggle.git scroll-toggle && cd scroll-toggle && npm install && gulp```

You should now have the plugin's example running locally. Any changes made to the source files will be recompiled and the example page refreshed in the browser.

## TODO
Add tests.
