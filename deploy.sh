#!/usr/bin/env sh
# abort on errors
set -e
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/Harry-Woodall/SpotifyStats.git master:gh-pages
cd -