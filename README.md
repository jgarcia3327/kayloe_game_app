- System:
Laravel react

- Prerequsite:
Laravel react prerequisite

- Installation
run composer install to generate depedencies in vendor folder
change .env.example to .env
run php artisan key:generate
install mysql: brew install mysql
create game_app DB and run php artisan migrate:refresh
install node: brew install node
install vite: npm create vite@latest

- Link storage to public
run php artisan storage:link