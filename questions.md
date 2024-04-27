### 1. What is the difference between Component and PureComponent?  Give an example where it might break my app.
The difference between a `component` and  a `pureComponent` lies in how and when they are re-rendered. A `component` is rerendered whenever it's parent is re-rendered, even if it's own props/state don't change. On the other hand, a `pureComponent` is re-rendered only if it's props/state have changed. 

The way a `pureComponent` achieves this  performance optimization is by doing a shallow comparision of props/state (in shouldComponentUpdate) between renders. However, this could cause some UI issues. For example, let's assume the parent component's state is a nested object, and some of these nested values are changed by the user interaction. If this nested object is passed to a `pureComponent` as prop, the shallow comparion wouldn't indentify these nested changes and therby doesn't re-render the component. This could lead to the UI having stale data.

### 2. Context + ShouldComponentUpdate might be dangerous. Why is that? 
This used to be a problem with the legacy context API, where in if an intermediate component blocks the re-render by implementing the shouldComponentUpdate, the context changes which were supposed to go from the parent component to the child component through this intermediate component, will be blocked. So the child component will not know the latest context changes.
This was eventually fixed in the new createContext api, and now all the child components are re-rendered and receive the context changes, regardless of whether they implement shouldComponentUpdate or not.

### 3. Describe 3 ways to pass information from a component to its PARENT. 
- `Callback functions`: The Parent can pass a callback function as prop to the child component. The child component can then pass information as arguments to that callback function, which will eventually reach the parent component.
- `State Management libraries`: The child component can dispatch actions, which can mutate the store with the information. The parent component can listen to the store changes and retreive that information.
- `Context`: Instead of passing callbacks as props to child components, we can add those methods to the context. Since the parent provides the context to all it's children components. The child component can access those methods from the context, and can pass in the information as arguments. These arguments will reach the parent component.

### 4. Give 2 ways to prevent components from re-rendering.
- `useCallback`: Suppose a component is passing some of it's functions down to it's child components as props. Now, whenever this component re-renders, these functions are redefined before sending as props to child components. Even if the function definition is still the same, since it is re-defined (new reference) it will be treated as a new prop and all the child components are re-rendered. useCallback can be helpful in such situations. It memoizes the function, and if none of the dependencies change, the function reference stays the same. And since we are passing the same function reference as prop, this child component will not be re-rendered unnecessarily.
- `useRef`: using useRef over useState will not trigger the re-render of the component. If we want some value that doesn't impact the component's UI, but need to be persisted between renders, we can save that value in useRef instead of useState. This will reduce the re-renders of the component.

### 5. What is a fragment and why do we need it? Give an example where it might break my app.
If we want to return multiple elements from a component, they need to be wrapped by an element like div or span. This creates additional nodes in the DOM tree. And React fragments are a way to avoid to this. By wrapping the elements with a React fragment, no new node will be created in the DOM tree.

I personally have not ever faced a problem with fragments. However I believe there could be issues if the fragments are used to wrap free strings. The strings will linger in the DOM tree, and if some translate or syntax higlighting service wants to add and remove nodes around these free strings, they would miss the heirarchy information and might fail.

###  6. Give 3 examples of the HOC pattern.
 - `withStyles`: We can have a HOC to apply some theme or styles to the input component.
 - `withLogging`: We can use HOC to wrap a component with a logger to log the component mount and unmount details.
 - `withLoader`: We can use a HOC to show the loading  indicator while the API call is in progress (The url to fetch is received as an argument)

### 7. What's the difference in handling exceptions in promises, callbacks and async…await? 
The difference is mostly in the readablity and maintanability of execptions.
- If you are having nested callbacks, the callback hell is already hard to read and managing errors on top is very tedious. Each `callback` will have to handle the error case within it.
- Using `promises` will make this callback hell cleaner. And in regards to errors, a single `catch` block is enough to handle all the errors from all the preceding `then` blocks.
- `async/await` makes the error handling much cleaner. A single `try/catch` block is enough to handling all the errors thrown

### 8. How many arguments does setState take and why is it async.
- `setState` takes two arguments. The first one could be an object or function, and the second argument is an optional callback function which get triggered after the re-render.
- Due to performance reasons, React doesn't immediately reflect on the changes state. It batches such state updates and apply to the DOM eventually. However, if we want to update a state based on it's prev value, we can do that through the first argument to setState. 


### 9. List the steps needed to migrate a Class to Function Component.
The process can be broadly covered by the following steps:
- Change the class definition to function definition. This also involves remvoing the constructor function and translating the this.state to useState hooks
- Use the render method body as the return for function
- Delete the 'this' keywords
- Change the helper methods to arrow functions
- Replace the lifecycle methods with hooks. componentDidMount, componentDidUpdate, componentWillUnmount all can be replaced by a single useEffect hook.
- Change the import and export statements appropriately.
- And finally, test and refactor the code.

### 10. List a few ways styles can be used with components.
- Styled components
- CSS Frameworks (Bootstrap, Tailwind, MUI etc)
- Inline CSS
- Normal CSS or Style sheets
- CSS preprocessors liek Sass
- CSS modules
### 11. How to render an HTML string coming from the server. 
- We can use `dangerouslySetInnterHTML` to render the HTML string, provided you trust the HTML string coming from the server.
- Otherwise we can parse the HTML string to create React elements, which can eventually be rendered by React.