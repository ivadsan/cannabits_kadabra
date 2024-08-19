[//]: # @param group $$ Kadabra V2
[//]: # @param title $$ README
[//]: # @param author $$ Iván D. Sánchez

# Kadabra DOCS

Kadabra Docs is a library designed to render Markdown documents and organize them efficiently. It allows you to group documents into different categories and present them in a user-friendly interface with tables of contents and search functionality. With Kadabra Docs, you can enhance the navigation and accessibility of your documentation, making it easier to find and organize information across large collections of documents.

## Install

To install the library, use npm

    npm install kadabra-docs

## Usage

Once installed, you need to import the styles and the Kadabra component into your application's entry point, typically App.js or index.js.

    import "kadabra-docs/dist/bundle.css";

Ensure that you import `kadabra-docs/dist/bundle.css` to apply the necessary styles for proper rendering and layout of your markdown documents and their organization within the interface.

## Running the Script Before Starting the Application

This library includes a script that processes markdown files and generates a directory file (directory.txt) with metadata and table of contents information. This script must be executed before starting the application to ensure that the processed data is available.

To automate this, you can add the following scripts to your package.json in the destination application:

    {
      "scripts": {
        "build-content": "node ./node_modules/kadabra-docs/scripts/processNotes.js",
        "start": "npm run build-content && react-scripts start",
        "dev": "npm run build-content && react-scripts start"
      }
    }

The build-content script will process the markdown files before starting the React development server with npm run start or npm run dev. This ensures that the directory file is always up to date before the application is launched.

Simply run npm start or npm run dev, and the library will handle the rest.
