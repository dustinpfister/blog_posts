# todo list for scripts folder

This is a todo list for the scripts folder.


## () - cli/report-pec
* start a cli tool that will build Post Edit Count Reports
* build files at root
* creates JSON files
* creates HTML files

## ( done 11/02/2021 ) - /lib/diff-days - commit start point
* can give a 40 digit hash rather than just a number of commits to go back 

## ( done 11/02/2021 ) - new cli tool of diff-days
* (done) start a new diff-post-days cli script folder
* (done) script uses git log to get an array of objects containing commit id hash codes, and dates back a given number of commits
* (done) script then uses this array to do a git diff for the start and end of each day in the commits
* (done) the end result is an array of objects that where each object contains a date an array of files that where edited pr created for that day

## ( done 11/02/2021 ) - new lib folder for scripts
* (done) start a new lib folder that will just contain various liberties to use for both apps and cli tools
* (done) new diff-days lib
* (done) new dirs lib that will be a replacement for cli/paths