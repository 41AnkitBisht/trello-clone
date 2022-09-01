# Trello Clone 

This project was made using create-react-app. Deployed : https://trellosboard-clone.netlify.app/

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `Features`

1. You can add list and card. List will represent stage of project while card will be task for the project.
2. While creating list needs just the title , card will accept title, files and assigned value.
3. You can drag and drop cards between any two list with completed being an exception . You cannot drag a task once its completed.
4. While dropping a task in completed list you will be prompted to make a comment.
5. You can also search files with there title [debounce function is used to create a delay of 500ms between search].
6. YOu can also shuffle lists to your liking.
