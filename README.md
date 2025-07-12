- System:
Laravel react

- Prerequsite:
Laravel react prerequisite

- Installation
- Update config
change .env.example to .env
- Generate depedencies in vendor folder
run composer install
- Generate key
run php artisan key:generate
- *Database
install mysql: brew install mysql
- *Migrate
create game_app DB and run php artisan migrate:refresh
- *Node
install node: brew install node
install vite: npm create vite@latest
- Link storage to public
run php artisan storage:link
