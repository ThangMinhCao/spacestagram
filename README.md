# Spacestagram - Shopify Frontend Summer 2022 Internship

[:link: **Try it out**](https://spacestagram-thangcao.netlify.app/)

## Highlighted features

- See photo posts as a list of card with 4 main details: photo, title, date and description.
- Like a one of the photo by clicking on the heart on the post. If it's pink, the user has liked it.
- Select a date range with a callendar picker to see a gallery of photo of the date in the range.
- See the generated photo gallery and the user's favourite gallery separately. User can click on one of two button on the top right corner to change the gallery.
- A loading spinner will be shown below the calendar picker during API fetching.
- The page automatically saves to **local storage** so the favourite list will remain after reloading the page.

## Development technologies

React + TypeScript built with `create-react-app`

#### Development notes

The main components: `Card` and `Button` are developed from scratch using React and CSS.

## External libraries

- `react-date-range`: for the calendar date picker.
- `react-loader-spinner`: for the spinner during API calls.
- `@material-ui/icons`: for the "Favourite" and "Photo library" icons used on the buttons.
