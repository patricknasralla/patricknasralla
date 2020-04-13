---
title: "Creating a rich text editor with built in thesaurus using React, Typescript and SlateJS."
date: "2020-03-02"
type: "tutorial"
titleImage: ../assets/img/thesaurus_editor.jpg
tags: []
---

Getting user input into a SPA can be a daunting task. Especially if you need to allow for rich text input or complex data entry that is dynamic and difficult to model with a form. In this tutorial I will show you how to build a rich text editor with a dropdown thesaurus so you can change your words on the fly as you type. To do this we'll be using React and SlateJS - a rich text library that takes the pain out of using `contentEditable` to provide a platform for rich text editing in the browser. We'll also be doing it all in Typescript ~~as it's just better~~ as it will help with code completion and general structuring of the application. On top of that, there isn't any typescript documentation for Slate as it stands, so this will also act as a primer if you want to use Slate with Typescript in future projects.

A quick note before we begin, I intend this to be a dynamic document and tutorial, Slate is still in beta and is rapidly evolving (a bit more on that later). As such, there may well be better ways of achieving some of the things I set out here. If you think something can be improved or changed, of if you see a glaring error: drop a comment below!

This tutorial assumes a general knowledge of React and at least a cursory understanding of the Typescript syntax. I'll also be setting up Slate in the base application quite quickly, if you want a slightly more in depth guide to getting Slate up and running, there is a good introduction available on the Slate site itself [here](https://docs.slatejs.org/). Other than that, I'm not going to assume any other prior knowledge.

### A quick note on SlateJS beta and breaking changes
Slate is currently still in beta and has undergone a number of *breaking* changes over the past few months. This has stabilised somewhat since the start of 2020 but it is not possible to guarantee that this will remain the case forever until version 1.0.0. This tutorial uses Slate 0.57.1 and I would recommend that this is the version that you use when following along. Updates to the tutorial will be reflected here.

## Tag points:

1. Initial set up with slate and slate-react installed
2. Styled editor


## Notes:

### 1: Inital set up
clone repo and check out tag 01

### 2: Install Slate

### 3: styling the editor
Add `:root` css to index for use with rems and explain why plus set some slightly nicer colours (we can do theming later!)
Move App to directory for lumping with styles
Import styled components and @types/styled-components
Create components for Container and EditorStyles
Import IBM Plex Mono into public html head (and change title to "My Awesome Slate Editor"...)

### 4: getting the cursor position
initially use useEffect to get the cursor using getBoundingClientRect() and link it to value (for now. Spoiler this will change so don't worry about bugs)
save the DOMRect to state
console.log sanity check

### 5: displaying a floating menu
- remove console.log
- create new folder: FloatingMenu with index.tsx and styles.tsx
- in index.tsx create a new component called FloatingMenu. Note that this is a React.FC component but you'll need to specify props as an interface to allow for use of the cursorPosition as a prop
- you'll want to just return a placeholder for now.
- Discuss using ReactDOM and portals here.
- explain that you want to return a portal that sits outside of the main DOM tree as this is much better for screen readers and accessibility.
- create StyledFloatingMenu in styles.tsx -> this will display the floating menu based on the cursor position (again, note the changes for typescript)
- note that display: flex and column is for later but seeing as we know that we're going to want to display children components, this is worth putting in now...
- Discuss the benefits of using conditionals and props and that's why we're using styled components (or css in js at least) here.
- explain the top and left values: position is the absolute window position from getBoundingClientRects(). pageOffset is to take into account any scrolling so that the calculated position is based on the viewport rather than the window as a whole. The integers are just to offset the start so that it appears in line with the letter before the cursor and below it.
- import FloatingMenu component into App and display it.

### 6: getting the current word from Slate
Now that we have our floating menu, we need to be able to pull the current word from Slate so that we can then use it for our real-time thesaurus search.
There are a lot of ways to do this, but I have found that the most robust way is to pull the word from the slate value itself.

Looking at Slate, you can see that every time a change occurs in the editor, the onChange function is called. You can handle this yourself.

Refactor the current onChange so that you can handle it outside of the render return.

Code snippets
```
export const App: React.FC = () => {
...
  const handleChange = (value: Node[]):void => {
    setValue(value);
  }; 
  ...
  
  ...
  <Slate
    editor={editor}
    value={value}
    onChange={value => handleChange(value)}
  >
  ...
}
```

Import `Editor` and `Range` from Slate. These are interfaces through which we can make changes and get data to and from the editor. They're also written in typescript which means that you can get a lot of information from the type def files about how they work (which is useful seeing as Slate's current documentation is somewhat lacking!)

```
...
import { createEditor, Node, Editor } from "slate";
...
```

here's the `handleChange` function with the logic to get the current word at the selection:

```
...
const handleChange = (value: Node[]):void => {
  setValue(value);
  if (!editor.selection) return;
  const [node] = Editor.node(editor, editor.selection);
  if (!node.text) return;
  const textToSelection = node.text.slice(
    0,
    Range.start(editor.selection).offset,
  );
  const allWords = node.text.split(/\W/);
  const wordsToSelection = textToSelection.split(/\W/);
  const currentIndex = wordsToSelection.length - 1;
  setCurrentWord(allWords[currentIndex]);
}; 
...
```
Let's deconstruct this a litte...
`Editor.node()` returns the Slate node as an array of `[node, path]` (but we currently don't care about he path, so we destructure the array to just the first elementdepth:) when passed an editor and a Slate Range (in this case the selection).

Because we have no idea where the current selection is in the node itself (the end user may have clicked half way through a word for all we know) we want to use the current selection offset to work out where we are. But we want to return the *whole* current word, not just up to the selection.

`textToSelection` slices the current node's text up to the offset of the selection start (`Range.start` simply returns the 'start' point of a selection's `anchor` and `focus` in order to always return the 'first' point in a text if a selection is reversed)

Next we get `allWords`: all the words in the current node as an array, splitting on word boundaries. On top of that, we do the same with `textToSelection` to get all words up to the selection start.

The length of wordsToSelection should be our current word's index plus one (given that arrays are zero indexed) so that's what we set the current word to be!

Let's check to see if this is working by having our floating menu display the current word. First we're going to have to update the props interface so that typescript knows that our component is going to receive a currentWord string:

```
interface FloatingMenu {
  cursorPosition: DOMRect;
  currentWord: string;
}
```

Next, let's pass the currentWord and display it in the component:

```
export const FloatingMenu: React.FC<FloatingMenu> = ({
  cursorPosition,
  currentWord
}) => {
  return ReactDOM.createPortal(
    <StyledFloatingMenu position={cursorPosition}>
      {currentWord}
    </StyledFloatingMenu>,
    document.body
  );
};
```

```
...
return (
  ...
  {cursorPosition && (
    <FloatingMenu
      cursorPosition={cursorPosition}
      currentWord={currentWord}
    />
  )}
  ...
);
```

Give it a go! You'll see that as you type the word updates and moves with the cursor. You'll also notice a bug: the floating menu position doesn't seem to update when you move the selection! Why don't you try and fix this yourself and then follow along below for my solution.

The reason the menu isn't updating is that even though moving the selection counts as a change in Slate, it isn't updating the value and so useEffect isn't running. It's actually very difficult to isolate Slate's onChange method as a dependency because it is managed internally. A quick fix for now is to set useEffect to update when currentWord changes rather than value.

```
useEffect(() => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  setCursorPosition(sel.getRangeAt(0).getBoundingClientRect());
}, [currentWord]);
```

This works well until you move the selection to within the same word (at which point it doesn't update). I want to stop here for a second to think about possible solutions. We could try and find a better way of setting the dependencies so that the position is recalculated more frequently but I would argue that it might be better to think about what we want to achieve from a UX point of view here first. Do we actually want the floating menu to follow the cursor or would it be better if it floated below the current word's start letter and grew as the word grew? I would argue that we would be better off calculating the position of the start of the word and displaying the floating menu there. That way you would have an idea of where your new thesaurus term is going to be inserted.

Let's try and implement this.

### 7: Fixing the Floating menu position

Given that we are working with DOMRanges for getBoundingClientRect. It would make sense to determine what the range would be at the start of the word. We already know that we can get our selection range so all we really need to know is how many characters exist between where our selection is and the start of the word and create a new range at that offset. First, let's get the current word offset:

```
...
  const handleChange = (value: Node[]): void => {
    setValue(value);
    ...
    const currentIndex = wordsToSelection.length - 1;
    
    const currentWordOffset =
      textToSelection.length -
      wordsToSelection[wordsToSelection.length - 1].length;
    
    setCurrentWord(allWords[currentIndex]);
    setCurrentWordOffset(currentWordOffset);
  };
...
```

Next, let's use this to create a new range and use that range as the basis for our getBoundingClientRect calculation:

```
  useEffect(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0).cloneRange();
    range.setStart(sel.anchorNode!, currentWordOffset);
    range.collapse(true);
    setCursorPosition(range.getBoundingClientRect());
  }, [currentWord, currentWordOffset]);
```

`cloneRange()` returns a new Range object so that we can alter the start of it without affecting our current selection. If you don't do this you end up having some strange behaviour when the start of your selection is changed (i.e. when dragging a selection, it keeps resetting). Other than that, we set the new range to start at the calculated offset where the current word begins and then make sure it's collapsed before calling our `getBoundingClientRect` as before.

And with that, we've fixed the issues with the floating menu position and have considered the user experience whilst doing so. Give it a go and see what you think! Next, we should probably do something useful with what we've built... let's make that live thesaurus we were talking about!

### 8: Fetching thesaurus data from Datamuse

For this example, I've decided to go with a realtime thesaurus functionality to showcase how awesome Slate can be. This means that it should suggest other words as you type. I realise that this may not be the best way of incorporating a thesaurus into an editor, but tutorial, so here goes!

[Datamuse](https://www.datamuse.com/api/) provides a free to use (for 100,000 queries per day) word-finding engine for developers. This service is what we will be using to get a thesaurus like function for our text editor.

Looking at the api, I've decided to go with 'means-like' rather than strict synonyms as it should provide a more varied selection of terms. The query string I've decided to go with is the following: `https://api.datamuse.com/words?ml=${word}&max=10`. Note that I've limited to max returned results to 10 for ease of display but the number is arbitrary.

Writing our fetch request outside of the component body is simple:

```
const searchThesaurus = (word: string) =>
  fetch(`https://api.datamuse.com/words?ml=${word}&max=10`);
```

But what is less simple is we'll also need to debounce our input. We don't want to send an API request on every keystroke but rather at natural pauses in between typing. Otherwise we'll flood the server with requests and have to parse partial words and deal with multiple incoming promises. Debouncing in react can be a bit problematic. Luckily for us though, [someone](https://twitter.com/sebastienlorber) has come up with a solution to this that simplifies things: [Awesome Debounce Promise](https://www.npmjs.com/package/awesome-debounce-promise).

First install the library: `npm i awesome-debounce-promise`

Now add a new, debounced version of our fetch function, again outside of the component:

```
const searchThesaurus = (word: string) =>
  fetch(`https://api.datamuse.com/words?ml=${word}&max=10`);
const searchThesaurusDebounced = AwesomeDebouncePromise(searchThesaurus, 500);
```

I've found that a gap of 500ms between requests seems to work well, but you can tweak this to fit your use case if you'd like.

Finally let's update our `handleChange` function to test this out:
```
  const handleChange = async (value: Node[]) => {
    ...

    setCurrentWord(currentWord);
    setCurrentWordOffset(currentWordOffset);
    
    const results = await searchThesaurusDebounced(currentWord).then(response =>
      response.json()
    );
    console.log(results);
  };
```

When we run our app now and select or type a new word we should get output like the following:
![Screenshot 2020-02-07 at 11.22.04](../Screenshot%202020-02-07%20at%2011.22.04.png)

### 9: Displaying the data in the floating menu
Create an interface for apiResult so TS plays nicely:

```
interface apiResult {
  word: string;
  score: number;
  tags: string[];
}
```

Use the result to populate a new state array

```
export const App: React.FC = () => {
...
  const [thesaurusResults, setThesaurusResults] = useState<string[]>([]);
  
  const handleChange = async (value: Node[]) => {
  ...
  await searchThesaurusDebounced(currentWord)
      .then(response => response.json())
      .then((results: apiResult[]) => {
        setThesaurusResults(results.map(result => result.word));
      });
  }
...
  return (
    <>
      ...
      {cursorPosition && (
        <FloatingMenu
          cursorPosition={cursorPosition}
          currentWords={thesaurusResults}
        />
      )}
    </>
  );
}
```

We need to update the type of data that the floating menu is going to get. While were at it, we should update our floating menu with item components that will eventually handle mouse input.

```
import { FloatingMenuItem } from "./FloatingMenuItem";

interface FloatingMenu {
  cursorPosition: DOMRect;
  currentWords: string[];
}

export const FloatingMenu: React.FC<FloatingMenu> = ({
  cursorPosition,
  currentWords
}) => {
  return ReactDOM.createPortal(
    <StyledFloatingMenu position={cursorPosition}>
      {currentWords.map((word, index) => (
        <FloatingMenuItem
          onClick={() => console.log(`clicked: ${index}`)}
          onMouseOver={() => console.log(`mouseOver: ${index}`)}
        >
          {word}
        </FloatingMenuItem>
      ))}
    </StyledFloatingMenu>,
    document.body
  );
};
```

```
import React from "react";

import { StyledFloatingMenuItem } from "./styles";

interface FloatingMenuItem {
  onClick: () => void;
  onMouseOver: () => void;
  active?: boolean;
}

export const FloatingMenuItem: React.FC<FloatingMenuItem> = ({
  active,
  onClick,
  onMouseOver,
  children
}) => (
  <StyledFloatingMenuItem
    active={active}
    onMouseOver={onMouseOver}
    onClick={onClick}
  >
    {children}
  </StyledFloatingMenuItem>
);
```

Here are the styles for the floating menu item, again we're taking advantage of conditional rendering of css from props provided by styled-components:

```
interface StyledFloatingMenuItem {
  active?: boolean;
}

export const StyledFloatingMenuItem = styled.div<StyledFloatingMenuItem>`
  transition: background-color 0.05s;
  margin: 0;
  padding: 0.2rem 0.4rem;
  border: none;
  text-align: left;
  font-family: "IBM Plex Mono", monospace;
  font-size: 1.5rem;
  background-color: #f8faf9;
  color: #585f65;
  :focus {
    outline: 0;
  }
  :active {
    outline: none;
    border: none;
    color: #f8faf9;
    background-color: #71787e;
  }
  ${props =>
    props.active &&
    `
    background-color: #DADDDF;
    font-weight: bold;
  `}
`;
```

Give it a go and it should update the contents of the floating menu dynamically as you type or move the cursor! You might notice a little bug though - there's a delay when you move the cursor causing the previous values to remain and then update as the promise resolves. We can fix this by adding a 'loading' state to the app component like so:

```
export const App: React.FC = () => {
  ...
  
  const [loadingResults, setLoadingResults] = useState(false);
  ...

  const handleChange = async (value: Node[]) => {
    ...

    setLoadingResults(true);
    await searchThesaurusDebounced(currentWord)
      .then(response => response.json())
      .then((results: apiResult[]) => {
        setThesaurusResults(results.map(result => result.word));
        setLoadingResults(false);
      });
  };

  return (
    <>
      ...
      {!loadingResults && cursorPosition && (
        <FloatingMenu
          cursorPosition={cursorPosition}
          currentWords={thesaurusResults}
        />
      )}
    </>
  );
};
```
try it again and you'll see that the floating menu only displays after the results are received!

### 10: Apply changes on click

We're finally ready to start programmatically changing the contents of the Slate editor.