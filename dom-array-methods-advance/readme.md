## DOM Array Methods

Project to teach high order array methods and DOM manipulation

## Project Specifications

- Fetch random users from the [randomuser.me](https://randomuser.me) API
- Use forEach() to loop and output user/wealth
- Use map() to double wealth
- Use filter() to filter only millionaires
- Use sort() to sort by wealth
- Use reduce() to add all wealth

## Advanced

- Put different function to different .js file to improve the code reusebility.
- Added loadingIndicator function which will show some text while loading.
- Added **The Observer Pattern**
- Added **Unit Test** using Jasmine test runner


### THE OBSERVER PATTERN

According to Wikipedia:

*The observer pattern is a software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods.*

The observer pattern defines a one-to-many relationship. When one object updates, it notifies many other objects that it has been updated.

- Observer pattern can be seen as a contract between subscribers and observer. All the subscribers know at the certain point of time, they will be invoked by observer (**oberver.notify()**) with some data in the form that they are all aware.




