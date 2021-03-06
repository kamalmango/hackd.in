"use strict";

var ProjectEntry = function ProjectEntry(_ref) {
  var project = _ref.project;
  return React.createElement(
    "div",
    { className: "project-entry" },
    React.createElement(
      "div",
      { className: "screenshot" },
      React.createElement("img", { src: project.image })
    ),
    React.createElement(
      "div",
      { className: "information" },
      React.createElement(
        "p",
        null,
        "Title: ",
        project.title
      ),
      React.createElement(
        "p",
        null,
        "Description: ",
        project.description
      )
    )
  );
};

ProjectEntry.propTypes = {
  project: React.PropTypes.object.isRequired
};

window.ProjectEntry = ProjectEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9zcmMvY29tcG9uZW50cy9Qcm9qZWN0RW50cnkuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxlQUFlLFNBQWYsWUFBZTtBQUFBLE1BQUUsT0FBRixRQUFFLE9BQUY7QUFBQSxTQUNuQjtBQUFBO0lBQUEsRUFBSyxXQUFVLGVBQWY7SUFDRTtBQUFBO01BQUEsRUFBSyxXQUFVLFlBQWY7TUFFRSw2QkFBSyxLQUFLLFFBQVEsS0FBbEI7QUFGRixLQURGO0lBTUU7QUFBQTtNQUFBLEVBQUssV0FBVSxhQUFmO01BQ0U7QUFBQTtRQUFBO1FBQUE7UUFBVyxRQUFRO0FBQW5CLE9BREY7TUFFRTtBQUFBO1FBQUE7UUFBQTtRQUFpQixRQUFRO0FBQXpCO0FBRkY7QUFORixHQURtQjtBQUFBLENBQXJCOztBQWVBLGFBQWEsU0FBYixHQUF5QjtBQUN2QixXQUFTLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QjtBQURULENBQXpCOztBQUlBLE9BQU8sWUFBUCxHQUFzQixZQUF0QiIsImZpbGUiOiJQcm9qZWN0RW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBQcm9qZWN0RW50cnkgPSAoe3Byb2plY3R9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwicHJvamVjdC1lbnRyeVwiPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2NyZWVuc2hvdFwiPlxuICAgICAgey8qcmV0dXJuIGZyb20gY2xvdWRpbmFyeSB1cGxvYWQgZnVuY3Rpb259Ki99XG4gICAgICA8aW1nIHNyYz17cHJvamVjdC5pbWFnZX0vPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzc05hbWU9XCJpbmZvcm1hdGlvblwiPiBcbiAgICAgIDxwPlRpdGxlOiB7cHJvamVjdC50aXRsZX08L3A+XG4gICAgICA8cD5EZXNjcmlwdGlvbjoge3Byb2plY3QuZGVzY3JpcHRpb259PC9wPlxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuKTtcblxuUHJvamVjdEVudHJ5LnByb3BUeXBlcyA9IHtcbiAgcHJvamVjdDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG59O1xuXG53aW5kb3cuUHJvamVjdEVudHJ5ID0gUHJvamVjdEVudHJ5O1xuIl19