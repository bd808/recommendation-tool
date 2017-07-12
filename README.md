# Recommendation Tool

This repo holds the code for [GapFinder](https://www.mediawiki.org/wiki/GapFinder).

To serve using nginx, we need to make sure all the routes are handled by React.

```
location / {
  try_files $uri $uri/ /index.html;
}
```

To build, enter the repo:
```
npm install
npm run build
```

To serve, copy the build to whatever directory is being served:
```
# Remove whatever was present before
rm -rf /var/www/html/*
# Insert the newly-built app
cp -r ./build/* /var/www/html/
# Restart nginx
systemctl restart nginx
```

