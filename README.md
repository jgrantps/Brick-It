# Welcome to Brick-it

Brick-it is a fully developed React/Rails API-powered user forum web-app designed for lego enthusiasts.  Leveraging the [ReBrickable API](https://rebrickable.com/api/v3/docs/), users can browse Lego sets from the ReBrickable catalogue and add them to their collection as either public or private selections.  Public selections are exposed to a community page, where other Brick-it users may post their own comments on any given public selection.

Brick-it is a secure app, utilizing JWT and Omniauth (via Github) sign-up & log-in strategies. Live comment updating is provided via JavaScript polling (see the end of the readme for details on the websocket-based updating strategy in this repo).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Installing

**In order for any part of the app to work, you must boot up both the front and back ends of this project (found in their respective folders).**

Step 1: First fork and Clone the this Repo.

Step 2: In the `/backend` directory, first run `bundle install` to initialize the project dependencies.

```
bundle install
```

Step 3: In the `/backend` directory, run `rake db:migrate` to initialize the database.

```
rake db:migrate
```

Step 4: In the `/backend` directory, run `rails s -p 5000` to spin up the rails server on the appropriate port

```
rails s -p 5000
```

Step 5: In the `/frontend` directory, run `npm install` to initialize the React dependencies.

```
npm install
```

Step 6: In the `/frontend` directory, run `npm start` to start the react.js app.

```
npm start
```

## Built With

* [Ruby On Rails](https://rubyonrails.org/) - The Framework used for the API
* [OmniAuth Github](https://github.com/omniauth/omniauth-github) - The Omniauth strategy for authenticating to Github.
* [fast_jsonapi](https://github.com/Netflix/fast_jsonapi) - The JSON:API serializer for backend ruby objects
* [React](https://facebook.github.io/react/) - JavaScript library used
* [Redux](http://redux.js.org/) - Used for Frontend State Management
* [Tailwindcss](https://tailwindcss.com/) - the CSS framework used


## Contributing

Comments and suggestions are welcome.  Feel free to submit a pull request with details of what you think could be improved.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Peter Grant** - *Initial work* - [PurpleBooth](https://github.com/jgrantps)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Special thanks to the faculty at Flatiron School for their assistance in acheiving some of stretch goals in this project.
* Special thanks to [Joan Deitchman](https://github.com/jdeitchman) for being an exceptional sister and friend in helping me with my journey into the tech space.
