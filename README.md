# Requirements:

Please prepare an auto-complete component in React TypeScript.

##### [x] Performance matters as we are expecting a production ready component.

- Optimized the performance by using useCallbacks

##### [x] You cannot use any 3rd party libraries - only pure React and internal DOM functions.

##### [x] You should use TypeScript and write proper interfaces and types.

- Implemented types for options, events and mock API calls

##### [x] The function to filter the data should be asynchronous. You can use mock data (such as a JSON array), but the function which uses it should be asynchronous (similar to a real REST call).

- Simulated the filterData function to work asynchronously
- As the search term changes, multiple API calls happen. Because of the delay, old string responses can be shown in the results. So I discarded all such old responses and ensure only the current string response is shown.
- If the API is costly, we can reduce these redundant calls by debouncing the filterOptions function

##### [x] It should have basic working CSS. No need for anything fancy (such as drop shadows etc).

- Added basic CSS

##### [x] You need to handle all non-standard/edge use-cases - it should have a perfect user-experience.

- Supports tab, mouse clicks, keyboard navigation, and click away

##### [x] Highlight the matching part of the text, in addition to showing it.

##### [x] No external state management libraries (refer to #1 as well), only native React method.

##### [x] Use only functional components with hooks.

##### [x] Shortcuts and hacks are ok - but you have to add comments on what you are doing and why.

##### [x] Add a README.md file explaining how to run the project.

##### [ ] Bonus Point: Load data using a real API call to some resource.

- Couldn't complete this because of time constraints.
- As I've already mocked the APIs, I just need to replace them with actual fetches. Nothing is expected to break.

## Additional Notes

### Known Issues:

- Yet to implement the scroll-to-view functionality as the user navigates with the up and down keys. Currently if the results dropdown is overflowing, the selected item maybe out of the view and the user wouldn't see the up-down arrows working.

### Tweak

- Tweak the following to see how the UI works in slow network scenarios

```
MOCK_OPTIONS_API_DELAY
MOCK_FILTER_API_DELAY
```

### Images/Clips


https://github.com/sakethvarma397/deel-assignment/assets/29940063/de538bad-cfb1-448a-b299-42d63fa9b8dc



# How to run

Clone the repo, cd into the directory and run the following commands:

```
npm install
npm run dev
```
