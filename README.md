# fl
To be written.

# Basic Setup
1. `bundle install`
1. `npm install`
1. `rake db:setup`
1. `foreman start -f Procfile.dev`
1. Open a browser tab to [http://0.0.0.0:4000]()

## Build JS/CSS bundles

Run `webpack` to build the JS/CSS bundles and have them saved in the
Rails asset pipeline (app/assets). Although not shown in this tutorial, the
Webpack ExtractTextPlugin can optionally be used to extract the CSS out of
the JS bundle. We've chosen to let Rails handle CSS, SCSS, images, fonts.

```
cd client
$(npm bin)/webpack -w --config webpack.rails.config.js
```

`client-bundle.js` is generated and saved to `app/assets/javascripts`. This is included in the
Rails asset pipeline.

Observe how the bundles are automatically re-generated whenever your JSX changes.

## Run Rails server

Once the JS bundle has been generated into the Rails asset pipeline, you can start
the Rails server.

```
cd <rails_project_name>
rake db:setup
rails s -p 4000
```

Now point your browser to [http://0.0.0.0:4000]().

Note that it's important to run the Rails server on a different port than the node server.

# Webpack configuration
- `webpack.hot.config.js`: Used by server.js to run the demo HMR server.
- `webpack.rails.config.js`: Used to generate the Rails bundles.
- `webpack.common.config.js`: Common configuration file to minimize code duplication
between the HMR and Rails configurations.

# Bootstrap integration
Notice that Bootstrap Sass is installed as both a gem and an npm package.
When running the Rails app, the bootstrap-sass gem assets are loaded directly
through the asset pipeline without going through Webpack.

See `app/assets/application.css.scss`.

On the other hand when running the Webpack dev server, the bootrap-sass npm
assets are loaded through Webpack (with help of the bootstrap-sass-loader).
See `webpack/webpack.hot.config.js`.

Bootstrap can be customized by hand-picking which modules to load and/or overwriting
some of the Sass variables defined by the framework.

## Bootstrap modules customization

If you are not using all the Bootstrap modules then you'll likely want to customize
it to avoid loading unused assets. This customization is done in separate files
for the Rails app versus the Webpack dev server so it's important to keep these
in-sync as you develop your app in parallel using the Rails and the Webpack HMR
environments.

- Rails Bootstrap customization file: `app/assets/stylesheets/_bootstrap-custom.scss`
- Webpack HMR Bootstrap customization file: `webpack/bootstrap-sass.config.js`

## Bootstrap variables customization

If you need to customize some of the Sass variables defined in Bootstrap you
can do so by overwriting these variables in a separate file and have it loaded
before other Bootstrap modules.

To avoid duplicating this customization between Rails and Webpack HMR,
this custom code has been consolidated under Webpack in
`webpack/assets/stylesheets/_bootstrap-variables-customization.scss` and the
`webpack/assets/stylesheets` directory has been added to the Rails asset pipeline
search path. See config `config/application.rb`. Keep that in mind as you
customize the Bootstrap Sass variables.

# Notes on Rails assets
## Javascript
The `webpack.rails.config.js` file generates client-bundle.js which is then included
by the Rails asset pipeline.

## Sass and images
1. The Webpack server loads the images from the **symlink** of the
   `app/assets/images` directory.
2. Since the images are not moved, Rails loads images via the normal asset
   pipeline features.
3. The `image-url` sass helper takes care of mapping the correct directories for
   images. The image directory for the webpack server is configured by this
   line:

```
{ test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images"}
```

## Sass and fonts
The tutorial makes use of a custom font OpenSans-Light. The font files are located
under `app/assets/font` and are loaded by both the Rails asset pipeline and
the Webpack HMR server. See the **symlink** under `webpack/assets/fonts` which
points to `app/assets/fonts`.

Note that the libsass C library, which is used by the Webpack sass-loader, does not
support the font-url() helper so we use url() instead. See the hack in
`webpack/assets/stylesheets/_bootstrap-variables-customization.scss`.

# Process management
Run the following command in your development environment to invoke both Webpack and Rails.
```
bundle exec foreman start -f Procfile.dev
```

# Source Maps
They work for both Rails and the Webpack Server!

# Deploying to Heroku

In order to deploy to heroku, you'll need to run this command once to set a custom
buildpack:

```
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
```

This runs the two buildpacks in the `.buildpacks` directory.

Also make sure you are running the latest heroku stack, cedar-14, to avoid running
into the [following issue](https://github.com/sass/node-sass/issues/467#issuecomment-61729195).

```
heroku stack:set cedar-14 -a react-webpack-rails-tutorial
```

To deploy the app on Heroku:
```
git push heroku master
```

# Running Tests
*Default rake task runs tests and linting*

We have feature tests in /spec/features

Run the tests with `rspec`.

If you get errors when running rspec in that it can't find expected DOM elements, then you'll want to
check if you have qt-4.x installed. You need at least qt-5 installed.

```
brew info qt
```
Check the output. Does the version say less than 5? If so, install qt5.
```
brew uninstall qt
brew install qt5
```

Then you need to run
```
gem uninstall capybara-webkit
QMAKE=/usr/local/Cellar/qt5/5.4.0/bin/qmake bundle install
```

**IMPORTANT** Be sure that the path indicated for the QMAKE corresponds to a correct path.

Then run `rspec` and you should see the tests have passed.

# Credits
- Forked from [Fast Rich Client Rails Development With Webpack and the ES6 Transpiler](http://www.railsonmaui.com/blog/2014/10/02/integrating-webpack-and-the-es6-transpiler-into-an-existing-rails-project/) ([justin@railsonmaui.com](mailto:justin@railsonmaui.com))