# todo list for scripts folder

This is a todo list for the scripts folder.

## () - cli/report-pec bug fix
* when the first commit of the day is made no files show up

## () - cli/report-wcdeltas
* use /lib/diff-days to get an array of commit day objects
* creating the start state of a postCollection object by:
    * use git to set the state of the repo to the oldest commit
    * run over the contents of the posts folder with an fs.readdir
    * in the postCollection object for each markdown files in the posts folder create a nested post object
    * for each post file set a word count value in the from of and object that contains the date, and the word count
    * use git to set the state of the repo back to the latest commit
* for each day from the start day:
    * use git diff to fine what files changed for that day
    * use git to set the state of the repo to that day
    * push new word counts objects for that day, for just the posts that changed
    * repeat this process for each day up to the latest day
    * use git to set the state of the repo back to the latest commit
* write the state of the postCollection as a json file

## ( done 11/03/2021 ) - cli/report-pec
* (done) start a cli tool that will build Post Edit Count Reports
* (done) creates HTML file
* (done) display cats for each day
* (done) add a dirs.user_folder prop for /lib/dirs
* (done) build files at user folder location

## ( done 11/03/2021 ) - /cli/report-pec - fix time gap bug
* (done) see about fixing bug where large blocks of days are not showing up even though work was done

## ( done 11/02/2021 ) - /lib/diff-days - fix weird bug
* (done) fix weird bug that seems to be the result of calling to many git diffs at once

## ( done 11/02/2021 ) - /lib/diff-days - commit start point
* (done) can give a 40 digit hash rather than just a number of commits to go back 

## ( done 11/02/2021 ) - new cli tool of diff-days
* (done) start a new diff-post-days cli script folder
* (done) script uses git log to get an array of objects containing commit id hash codes, and dates back a given number of commits
* (done) script then uses this array to do a git diff for the start and end of each day in the commits
* (done) the end result is an array of objects that where each object contains a date an array of files that where edited pr created for that day

## ( done 11/02/2021 ) - new lib folder for scripts
* (done) start a new lib folder that will just contain various liberties to use for both apps and cli tools
* (done) new diff-days lib
* (done) new dirs lib that will be a replacement for cli/paths