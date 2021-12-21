---
author: Samuel Gulliksson
title: "Preserving current page number with vscode-pdf"
tags: open-source
---

I'm using the VS Code extension
[vscode-pdf](https://marketplace.visualstudio.com/items?itemName=tomoki1207.pdf),
which under the hood uses
[PDF.js](https://mozilla.github.io/pdf.js/)
to render PDF files in a Webview within VS Code.
After loading, the extension watches the opened PDF file for changes
and if it detects any it reloads the file.
This is a great feature, except as reported in a
[Github issue](https://github.com/tomoki1207/vscode-pdfviewer/issues/118)
it causes the PDF view to jump to the top of the file on reload.
This is not so great if you're automatically (re)generating the PDF
from for example a Latex document and want to quickly be able to see your changes
(which is exactly what I do when editing my fiction writing).

The underlying
[PDF.js library already handles this](https://github.com/mozilla/pdf.js/issues/6847#issuecomment-451761859),
but it relies on detecting the page was reloaded
which doesn't look to be possible with the current VSCode Webview API.
Instead I figured it should be possible to grab the current page number,
reload the PDF file, and then reset the page number to the previous value.
Turns out that did work, and a
[fix](https://github.com/tomoki1207/vscode-pdfviewer/pull/121)
was released in version `1.2.0` of vscode-pdf.
