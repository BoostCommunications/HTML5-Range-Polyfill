HTML 5 range polyfill
=====================

Adds support for the HTML5 range-element to lesser browsers. Should work on most desktop browsers, as well as mobile browsers that support touch events.

Usage:
------

Include range.js at the bottom of your HTML file. The script creates a few HTML elements that need styling, try something like this:

    .fakeRange {
        width: 200px;
        background-color: #ccc;
        border-radius: 10px;
        height: 20px;
    }
    .fakeRangeHandle {
        width: 20px;
        height: 20px;
        background-color: black;
        border-radius: 10px;
    }
    .fakeRangeBackground {
        background-color: #999;
        height: 20px;
        border-radius: 10px 0 0 10px;
    }

TODO:
-----

- Lots...