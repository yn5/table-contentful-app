# Table Contentful App

[![Test Status](https://github.com/yn5/table-contentful-app/actions/workflows/test.yml/badge.svg)](https://github.com/yn5/table-contentful-app/actions/workflows/test.yml)
[![Code Coverage](https://codecov.io/gh/yn5/table-contentful-app/branch/main/graph/badge.svg?token=4R8CCZKZG6)](https://codecov.io/gh/yn5/table-contentful-app)
[![Install to Contentful](https://www.ctfstatic.com/button/install-small.svg)](https://app.contentful.com/deeplink?link=apps&id=1njfmzQLQpVeq8UeLFzXMQ)

This project was bootstrapped using [Create Contentful App](https://github.com/contentful/create-contentful-app) – a toolkit for rapidly building apps that integrate seamlessly with the Contentful App Framework.

---

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/yn5/table-contentful-app.git
cd table-contentful-app
yarn install
```

---

## 📦 Available Scripts

In the project directory, you can run:

### `yarn start`

* Registers (or updates) the app definition in Contentful.
* Starts the development server and opens the app in the browser.
* Hot-reloads on changes and displays linting errors in the console.

### `yarn build`

* Builds the app for production in the `build/` directory.
* React is bundled in production mode and optimized for performance.
* Output includes minified files with content-based hashes for cache busting.

### `yarn upload`

* Uploads the production build to Contentful as a new app bundle.
* Guides you through required deployment inputs.
* [Learn more about deployment](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/#deploy-with-contentful).

### `yarn upload-ci`

* Automates app upload using **environment variables** (ideal for CI/CD pipelines).
* Required environment variables:

  * `CONTENTFUL_ORG_ID` – your organization ID
  * `CONTENTFUL_APP_DEF_ID` – the app definition ID
  * `CONTENTFUL_ACCESS_TOKEN` – [your personal access token](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/personal-access-tokens)

---

## 🧰 Recommended Libraries

To match Contentful’s look and feel:

* **[Forma 36](https://f36.contentful.com/)** – Contentful’s official design system
* **[Field Editors](https://www.contentful.com/developers/docs/extensibility/field-editors/)** – Prebuilt React components for content model fields

---

## 🛠 Using the Contentful Management SDK

Each app location receives a [Contentful Management API](https://www.contentful.com/developers/docs/references/content-management-api/) client (`cma`) by default.

Example usage:

```js
// List all locales
cma.locale.getMany({}).then((locales) => console.log(locales));
```

More info: [SDK documentation](https://www.contentful.com/developers/docs/extensibility/app-framework/sdk/#using-the-contentful-management-library)

---

## 📚 Learn More

* 📘 [Create Contentful App Documentation](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/)
* ⚙️ [App Framework SDK Overview](https://www.contentful.com/developers/docs/extensibility/app-framework/sdk/)
* ⚛️ [Create React App Docs](https://facebook.github.io/create-react-app/docs/getting-started)

---

## 💡 Notes

This project is designed to simplify your workflow in the Contentful ecosystem while offering full customization using React. Ideal for content editors, developers, and teams seeking tailored CMS experiences.

Want to contribute or customize further? Open a PR or fork it to your own workspace!
