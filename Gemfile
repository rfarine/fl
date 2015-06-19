source "https://rubygems.org"
ruby "2.2.1"

gem "rails", "~>4.2"
gem "sqlite3", group: :development
gem "pg", group: :production

gem "sass-rails"
gem "bootstrap-sass", "~> 3.3.1"
gem "uglifier"
gem "coffee-rails"
gem "jquery-rails"
gem "turbolinks"
gem "jbuilder"
# bundle exec rake doc:rails generates the API under doc/api.
gem "sdoc", group: :doc

# Use Rails Html Sanitizer for HTML sanitization
gem "rails-html-sanitizer"

# Use Unicorn as the app server
gem "unicorn"

gem "autoprefixer-rails"

# Use Capistrano for deployment
# gem "capistrano-rails", group: :development
group :production do
  gem "rails_12factor"
end

group :development, :test do
  # Call "debugger" anywhere in the code to stop execution and get a debugger console
  gem "byebug"

  # Access an IRB console on exceptions page and /console in development
  gem "web-console", "~> 2.0.0.beta2"

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"

  gem "spring-commands-rspec"

  # Manage application processes
  gem "foreman"

  gem "factory_girl_rails"

  gem "rubocop", require: false

  gem "ruby-lint", require: false

  gem "scss-lint", require: false

  gem "brakeman", require: false

  gem "bundler-audit", require: false

  gem "rainbow"
end

group :test  do
  gem "rspec-rails"
  gem "database_cleaner"
  gem "launchy"
end
