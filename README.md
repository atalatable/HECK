# Heck
This is a bit more complicated

1) You need to have nodejs installed and setup
2) Open your terminal in the "back" folder and type `npm install`
3) To run a dev server just run `npm run dev` in the back folder (or `node index.js`)
4) It should be up and running on port 3000

### TODO
You must add a file named `.env` at the root

inside of it you have to write 
```dotenv
port = 3000
login_key = prout # (the key that will be used to login and update w-u)

# Mail informations
mail = yourmail@mail.com
mail_password = y0urM4ilp4ssw0rd666
mail_smtp = smtp.server.com # (see your mail settings to view smtp server and port)
mail_port = 587
```
It is used with `require('dotenv')` and then `process.env.constName` inside js files

> We are using ExpressJS for the back end
> 
> - index.js is the entry point [See ExpressJs quick Guide](https://expressjs.com/) to understand
> 
> - Under /views are ejs files (just like html but with logic things)
> 
> - Under /public are static files (images, css, client-side js, ...)
>
> - Under /routes are the server routing (api, admin, ...)

## Accessing via git
[See this git cheatsheet](https://about.gitlab.com/images/press/git-cheat-sheet.pdf)

If any problem ask @Atalata or @KrishenK
