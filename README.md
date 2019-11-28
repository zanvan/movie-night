## Movie Night App

This app lists movies grouped by genre.

- The movies are loaded live from TheMovieDB api - https://www.themoviedb.org/documentation/api
- User can sign up and login then is able to favorite genres or un-favorite a genre.
- User profile will persists in localStorage.
- Click on genre title will open the genre in grid mode.
- To come back to the full list of genre - click on the **All Genres** button on top left.
- Click on the text description will show it in popover.

The app was built with React and makes use of react hooks.
No special state manager was used.

For styling framework I used Material-UI which is a material-design framework built with react.
This framework offer a good list of built-in components for layout and fast development with opinionated styling approached developed by Google.

I tried to use angularJS but run into multiple issues with generating an angularJS project. After a while I decided with the interest of time I should revert to react.

If I had more time... 
- I would like to add an infinite scroll in the selected genre grid layout. I already prepared for passing the page number, but I wanted to get the full app working and the grid seems like good enough for now.
- Responsive design - make sure it can be viewed in small screens.
- The horizontal rows in the all genres view are very naively lined up. Should have buttons on both sides to scroll into view elegantly with animations.
- Search bar to search or filter the list.
- Favorite movies.
- Sorting
- Playing a trailer would have been great.
- Many more... it was fun :)

## Instructions

Clone or download from my github https://github.com/zanvan/movie-night

Install dependencies:
```
npm install
```
or
```
yarn
```

Then 
```
npm start
```
or
```
yarn start
```
