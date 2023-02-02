# Fanta mass Dm
## How to use
* Clone this repository and extract
* Copy the path of the directory and cd into it ( Command Prompt )

Example
```
cd C:\Users\example\Documents\Projects\example
```
* Run the following command

```
npm i
```

* Setup the bot.settings.js file and run the command

```
node . 
```
## How it works
> Opens a DM with every friend added on the account then proceeds to scrape every channel id.
> The bot then checks if the account has any messages within the channel (to prevent any CAPTCHA).
> The bot closes any empty channels
> then begins to dm the remaining channels after the filtering process is complete.

### Warning
> Even if the tool was tested out and made sure to work, self-botting is against the discord TOS.                                
> Therefore i am not responsible for any punishment placed on your accounts. 

![kirby is cool](https://media.tenor.com/L4TD4MWFy40AAAAi/kirby.gif "kirby is cool")

### Requirements 
* [node.js](https://nodejs.org/en/download/)
### Libraries 
* request-promise
* readline-sync
* chalk

### Developer
* fanta#1337
