---
title: "Creating a rich text editor with built in thesaurus using React, Typescript and SlateJS."
date: "2020-02-25"
type: "tutorial"
titleImage: ../assets/img/pen_and_ink.jpg
tags: []
---

Getting user input into an SPA can be a daunting task. Especially if you need to allow for rich text input or complex data entry that is dynamic and difficult to model with a form. In this tutorial I will show you how to build a rich text editor with a dropdown thesaurus that lets you can change your words on the fly as you type. To do this we'll be using React and SlateJS — a rich text library that takes the pain out of using `contentEditable` to provide a platform for rich text editing in the browser. We'll also be doing it all in Typescript ~~as it's just better~~ as it will help with code completion and general structuring of the application. On top of that, there isn't any typescript documentation for Slate as it stands, so this will also act as a primer if you want to use Slate with Typescript in future projects.

A quick note before we begin, I intend this to be a dynamic document and tutorial, Slate is still in beta and is rapidly evolving (a bit more on that later). As such, there may well be better ways of achieving some things I set out here. If you think something can be improved or changed, of if you see a glaring error: drop a comment below!

This tutorial assumes a general knowledge of React and at least a cursory understanding of the Typescript syntax. I'll also be setting up Slate in the base application quickly, if you want a slightly more in depth guide to getting Slate up and running, there is a good introduction available on the Slate site itself [here](https://docs.slatejs.org/). Other than that, I'm not going to assume any other prior knowledge.

### A quick note on SlateJS beta and breaking changes
Slate is currently still in beta and has undergone a number of **breaking** changes over the past few months. This has stabilised somewhat since the start of 2020, but it is not possible to guarantee that this will remain the case forever until version 1.0.0. This tutorial uses Slate 0.57.1, I recommend that this is the version that you use when following along. Updates to the tutorial will be reflected here.

Chapter/Git Tag Point list:

0. CRA hello world.
1. Install slate and dependencies, set base styles/rem size and fonts.

---
(Title photo by [Aaron Burden](https://unsplash.com/@aaronburden?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/y02jEX_B0O0))