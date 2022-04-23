---
author: Samuel Gulliksson
title: Using LaTeX for Story Structure
---

To visualize the plots of my fiction writing
I've created two LaTeX packages
that turns plaintext descriptions
into pretty-looking graphical representations.

The first package is based on
[Dan Harmon's Story Circle](https://en.wikipedia.org/wiki/Dan_Harmon#%22Story_circle%22_technique) –
[storycircle]({% link /assets/files/2022-04-23-latex-for-story-structure/storycircle.sty %}) provides a command accepting the eight descriptions of each stage of the circle:

<div markdown="1" class="example">
{% raw %}
```latex
\documentclass{standalone}
\usepackage[T1]{fontenc}
\usepackage{storycircle}

\definecolor{descriptionfill}{HTML}{F7F7F7}
\definecolor{nodefill}{HTML}{299AE0}
\definecolor{pathcolor}{HTML}{404E7C}

\begin{document}
\begin{tikzpicture}[
    story circle radius=4cm,
    story circle path/.append style={
        line width=2ex,
        color=pathcolor
    },
    story circle node/.append style={
        text=white,
        fill=nodefill
    },
    description/.append style={
        fill=descriptionfill
    },
    story circle radius=2.5cm
]
    \storycircle{% YOU
        A character is in a zone of comfort or familiarity.
        }{% NEED
        They desire something.
        }{% GO
        They enter an unfamiliar situation.
        }{% SEARCH
        They adapt to that situation.
        }{% FIND
        They get that which they wanted.
        }{% TAKE
        They pay a heavy price for it.
        }{% RETURN
        They return to their familiar situation.
        }{% CHANGE
        They have changed as a result of the journey.
        }
\end{tikzpicture}
\end{document}
```
{% endraw %}
![Example of story circle]({% link /assets/files/2022-04-23-latex-for-story-structure/storycircle.png %}){: class="center"}
</div>

I've also found a vertical timeline to be really helpful
to get an overview of the events in a story –
[vtimeline]({% link /assets/files/2022-04-23-latex-for-story-structure/vtimeline.sty %}) does exactly that:

<div markdown="1" class="example">
{% raw %}
```latex
\documentclass[x11names]{standalone}
\usepackage{vtimeline}

\definecolor{timeline}{HTML}{299AE0}

\begin{document}
\begin{vtimeline}[%
description={text width=8cm},
row sep=2ex,
timeline color=timeline]
19 July 1953 & Someone is born.\\
26 March 1960 & Someone else is born.\\
\elapsedtime\\
1966 & They meet.\\
1974 & They have a fight.\\
\withoutdate{Things escalate.}\\
\withoutdate{More events unfold.}\\
\withoutdate{One or the other dies.}\\
\end{vtimeline}
\end{document}
```
{% endraw %}
![Example of timeline]({% link /assets/files/2022-04-23-latex-for-story-structure/timeline.png %}){: class="center"}
</div>

<style>
    .example {
        display: flex;
        align-items: center;
    }

    .example .language-latex {
        width: 50%;
    }
</style>
