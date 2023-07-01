# Getting Started

## Installlation

Make sure you have [nodejs](https://nodejs.org/en) installed.

Use `git clone https://github.com/atalatable/HECK.git` or `git clone git@github.com:atalatable/HECK.git`, ou can also download the project as a zip and unzip it manually.

## Running the server

Then go to the root folder and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

# How to use

## Posting a new article

To post an article, got under the ./posts folder, create a folder for you category, and then create a markdown file with the name of you choice.

```
root/
    posts/
        category_name1/
            post1.md
            post2.md
        category_name2/
            post1.md
            post2.md
    ...
```

At the top of your markdown file you will need to specify informations :

```
---
    title: Title of the challenge
    description: The description you will make of the challenge
    isPublished: true if published
    publishedDate: dd/mm/yyyy
    tags:
        - tag1
        - tag2
        - ...

    # Not mandatory informations
    author: Author of the challenge
    challDescription: description from the challenge
    difficulty: score/difficulty
---
```

If you want to link images or files, just place them somewhere under the `public` folder and link them as you would in html.

> Example: you use `![image](/images/imagename.png)` if you placed the image under `./public/images/`

## Architecture

If you want to modify the styling, add pages, ... here is the architecture of the project (this file might change with time !).

```
.next/          # Don't touch it
components/     # Contains components
    layout.js       # Layout of all pages (header, footer, title, ...)
    writeup.js      # Component used to render the markdown files to html
helpers/        # Contains all nodejs helpers functions
    md.js           # Contains all function to read/retreive markdown files
node_modules/   # Don't touch it
pages/          # Folder containing all the pages (also used for routing of tha application)
    write-ups/      # Jvais pas tout expliquer non plus
        [category]/     # Anything on the url `website.com/write-ups/[category]`, (available paths in getStaticProps of index)
            [slug].js       # Same as for category, but here, for an article
            index.js        # home page for a category
        index.js        # home page for /write-ups
    _app.js         # Better not to touch it
    404.js          # Rendered page for a not found url
    index.js        # Home page of the website
    whoami.js       # website.fr/whoami page
posts/          # Folder containing all your markdown posts
    category/       # Each category is represented as a folder
        post.md         # each post with the previously described structure
public/         # Folder containing accessible files from any url. Here is a proposed structure but you can make your own (be carefull with script)
    assets/         # Used to keep any type of files
    images/         # Used for images
    script/         # In an ideal world you should not use script here but do everything with next
    favicon.ico     # Your favicon
styles/         # Folder used by nextjs for styling (we use it wrong)
    globals.css         # Used to for styling of pretty much all the website
    writeups.module.css # Used for styling the write up articles 
    wu.css              # I don't even know myself
The rest/               # Try not to touch it unless you know what you do
```

# Doc

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

  If you need any help ENVOIE UN MESSAGE A KENNY OU ANTOINE ON TE SAUVERA LA VIE.
