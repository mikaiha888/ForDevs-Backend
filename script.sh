# script.sh
npm_config_name=$1
npm run typeorm -- migration:generate src/db/migrations/$npm_config_name -d src/db/data-source.ts
