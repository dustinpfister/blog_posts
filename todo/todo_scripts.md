# todo list for scripts folder

This is a todo list for the scripts folder.

## () - cli/report-pec bug fix
* when the first commit of the day is made no files show up

## () - cli/report-wcdeltas
* (done) use /lib/diff-days to get an array of commit day objects
* for each day object to a git diff dayObj.startHash ... dayObj.endHash to get the additional and subtractions for each file
* parse out the numbers in terms of word count deltas for each file, in each day

## () - apps/post-sever - outgoing
* see about doing the same of outgoing links as I am all ready doing for internal links
* color code outgoing links in a different way for unknown, 200, and 404/500

## ( done 11/22/2021 ) - apps/post-sever - counts at top
* (done) have a count of 200 and 404 for each internal link at the top of the post

## ( done 11/22/2021 ) - apps/post-server - cat path
* (done) - have a categories path
* (done) - have a cats.json file that is used to set if there is indeed a cat sub path or not
* (done) - categories path responds with a 200 status if the sub folder is in cats.json and 404 if it is not

## ( done 11/21/2021 ) - apps/post-server - main index
* (done) have a main index that is just a list of links to each post

## ( done 11/19/2021 ) - apps/post-server
* (done) new app that will just serve a blog post file if is exists, esle it will give a 404 status as a response
* (done) can give a path like /yyyy/mm/dd/post-file-name/ or /yyyy/mm/dd/post-file-name/index.html for \_posts/post-file-name.md

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