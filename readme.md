# React Native Recipe App

Based on lecture delivered by Paul Lam.

This repo does not include config/api_config.js.

This uses API from edamam.com. Please register and get API key for the Recipe Search product.

To use, create an api_config.js in the following directory

```bash
src/components/config/api_config.js
```

and write the following

```javascript
export const APP_KEY = \\ Your API key
export const APP_ID = \\ Your App ID
export const BASE_URL =  "https://api.edamam.com/api/recipes/v2"
export const TYPE = "public"
```