---
author: Samuel Gulliksson
title: Visual Studio Code Extensions for Writing
---

Having delved deeper into the world of (creative) writing during the past year,
I had to incorporate some coding into my routine as well (to not got crazy).
As I ended up doing all my writing in VSCode,
and I'm not the only one
([1](https://hackernoon.com/customizing-visual-studio-code-for-writing-2e6e621e069e),
[2](https://levelup.gitconnected.com/turn-vs-code-into-the-perfect-writing-tool-a22a136e4360),
[3](https://jay-penner.medium.com/writing-novels-and-non-fiction-with-visual-studio-code-6d6ccd1561a5),
etc.),
it meant I could create some hopefully useful
[extensions](https://code.visualstudio.com/api)
for fun and profit.

That's how [`vscode-writing-suite`](https://github.com/zamzterz/vscode-writing-suite) was born.
It's an umbrella project containing multiple independent VSCode extensions –
in the spirit of the Unix philosophy: "Make each program do one thing well." –
intended to help when writing text (specifically tailored to my writing process, of course):

First up is a simple Pomodoro timer with the addition of a word count tracker for the work time:
>
[Pomodoro Writer](https://github.com/zamzterz/vscode-writing-suite/tree/main/pomodoro-writer)
helps with hitting your word count goal by showing how many words you have left to write.

Next is an outline visualizer that collates and displays the synopsis of a writing project:
>
[Outline Writer](https://github.com/zamzterz/vscode-writing-suite/tree/main/outline-writer)
provides an overview of the entire text, allowing to get a grasp of the structure at a glance.


## Small note on the use of a monorepo
For no other reason than "code colocation",
I opted to put the two different extensions in the same Github repository.

Turns out using Github Actions makes it a breeze
to still have completely separate workflows for each extension,
only triggering the CI workflow for an extension
[when files in that directory was changed](https://github.com/zamzterz/vscode-writing-suite/blob/main/.github/workflows/ci-outline-writer.yml#L5-L14).
