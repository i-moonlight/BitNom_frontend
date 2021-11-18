# frontend

Front-end code for BitNorm V1.0

## Developer Best Practices

The following are best practices that developers on this repo should adhere to so that the maintenance of code and perfomance of our product is achieved. Feel free to add to the list what you think is necessary for a smooth collaboration experience. Also feel free to ast for clarification if a point doesn't make sense to you.

-   Follow the _naming convention_ for both files an folders : `folder_name` : `FileName.jsx`.
    -   [ ] Correction: `bn_chat` subfolders and files
-   Always use `FileName.jsx` **for components** and not ~~`FileName.js`~~
    -   [ ] Correction: `bn_chat` subfolders and files
    -   [ ] Correction: `bn_knowledge_center` subfolders and files
-   Always _lazy load images_ and other media components. Use our custom `LazyImage` component.
-   Use code splitting using `React.lazy()` and react `Suspense` where applicable
-   Create an **_mui skeleton_** for major ui components. Otherwise a **_neat_** preloader would also be great
-   Always obey eslint `exhaustive-deps` (_don't disable next line_) or :
-   In case `exhaustive deps` makes component re-render severally, _split component_ into other components
-   Avoid large components, always split into smaller components for easier maintenance
-   Always use `formik` and `yup` for forms and validation
-   Organize imports regularly `Shift + Alt + O` on Visual Studio Code
-   Always clean out `console.log()` and `console.warn()` after debugging
-   use standard naming convention for `useState`. The first element is the value and the second is the setValue:
    -   [ ] Correction: `bn_knowledge_center` subfolders and files

```javascript
// use
const [state, setState] = useState();
const [userPosts, setUserPosts] = useState();
const [books, setBooks] = useState();
const [loaded, setLoaded] = useState();
// you get the idea

// do not use
const [varName, diferentUnrelatedVarname] = useState();
const [data, getData] = useState();
```

-   Always make sure your **_console_** is clean before submitting a merge request especially if they're **_fixable errors_**. In case of sturbon errors and warning, **seek help**. The only exceptions are these known errors:

```
Warning: forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?
```

and

```
index.js:1 Warning: Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: SideEffect(NullComponent)
```

-   Do not place any component other than `Tab` inside `TabList`. It throws Errors
-   Do not nest components inside `<Typography>` . Only text is allowed unless you provide a `component` prop eg `<Typography component='div'>`. The former is recommended
-   Always use `@mui/material` components (violated especialy on **bootstrap** `<button>`, and **bootstrap** grid (`row and col-*-*`) on `BNKnowledgeCenter`) and not `bootstrap` components or native components. The primary purpose of `bootstrap` is the **spacing** eg `p-*` and `b-*` , flex classes eg `d-flex` and `align-items-center` and text utilities like `fw-bold` and `text-capitalize`.
    -   [ ] Correction: `CryptoGazing.jsx` - use `@mui` `Grid` system
    -   [ ] Correction: `/con_details/partial/overview/General.jsx` - use `@mui` `Select` component
-   Use `Typography` in place of `p`
    -   [ ] Correction: `bn_knowledge_center` subfolders and files
-   Use `Grid` only where necessary. Not everything is a `Grid`
    -   [ ] Correction: `bn_chat` subfolders and files
-   Constants and styles should be placed below the component:

```javascript
import { makeStyles } from '@mui/material';
import React from 'react';

// do not place styles and constants here
export default function Component() {
    const classes = useStyles();

    return (
        <div style={classes.root}>
            {array.map((text) => (
                <li key={text}>{text}</li>
            ))}
        </div>
    );
}

// place at the bottom of component
const useStyles = makeStyles({
    root: {
        padding: 16,
    },
});

// place at the bottom of component
const array = ['one', 'two', 'three'];
```
