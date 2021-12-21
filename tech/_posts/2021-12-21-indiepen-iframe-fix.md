---
author: Samuel Gulliksson
title: Avoid iframe navigation affecting browser history
tags: open-source
---


This blog uses
[Indiepen for code examples]({% link tech/_posts/2021-12-11-indiepen.md %}).
It was working fine in Chrome,
but testing in Firefox showed something strange when navigating to [this post]({% link tech/_posts/2021-12-01-moving-poetry.md %}):
clicking the back button didn't seem to have any effect.
Not until after repeated clicks on the back button would the browser navigate back to a previous page.

Turns out the embedded Indiepen iframe's were to blame:
setting the iframe `src` attribute will add an entry to the browser history,
and that's exactly what Indiepen does to show the rendered result of a code example.
Since that particular blog posts contains multiple embedded Indiepen iframe's
it required multiple clicks on the browser back button, one for each embedded iframe.

The solution is to use `<frame>.contentWindow.location.replace(url)`
instead of assigning directly to `<frame>.src = url`.
I've contributed [a fix](https://github.com/yetanother-blog/indiepen/pull/121)
which has been merged. 🎉
