# frontend

Front-end code for BitNorm V1.0

## Developer Best Practices

The following are best practices that developers on this repo should adhere to so that the maintenance of code and perfomance of our product is achieved. Feel free to add to the list what you think is necessary for a smooth collaboration experience. Also feel free to ast for clarification if a point doesn't make sense to you.

-   Follow the _naming convention_ for both files an folders : `folder_name` : `FileName.jsx`
-   Always _lazy load images_ and other media components. Use `const image = React.lazy(() => import('../image.png'));` and not `import image from "../image.png"`
-   Use code splitting using `React.lazy()` and react `Suspense` where applicable
-   Create an _mui skeleton_ for major ui components
-   Always obey eslint `exhaustive-deps` (_don't disable next line_) or :
-   In case `exhaustive deps` makes component re-render severally, _split component_ into other components
-   Avoid large components, always split into smaller components for easier maintenance
-   Always use `formik` and `yup` for forms and validation
-   Organize imports regularly `Shift + Alt + O` on Visual Studio Code
-   Always clean out `console.log()` and `console.warn()` after debugging
