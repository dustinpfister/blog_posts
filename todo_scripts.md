# todo list for scripts folder

This is a todo list for the scripts folder.

## () - new cli tool of post file changes
* start a new diff-post-days cli script folder
* script uses git log to get an array of objects containing commit id hash codes, and dates back a given number of commits
* script then uses this array to do a git diff for the start and end of each day in the commits
* the end result is an array of objects that where each object contains a date an array of files that where edited pr created for that day

## () - new lib folder for scripts
* start a new lib folder that will just contain various liberties to use for both apps and cli tools