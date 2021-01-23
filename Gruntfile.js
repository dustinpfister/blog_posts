/*

Gruntfile for grunt-postcheck

 */

module.exports = function (grunt) {

    var fs = require('fs'),
    spawn = require('child_process').spawn,
    header,

    // the find helper
    find = function (done) {
        var files,
        // the list of markdown files to update
        toUpdate = [];
        console.log('finding...');
        grunt.util.spawn({
            cmd: 'git',
            //args : ['ls-files', '-m', '-o','--exclude-standard']
            args: ['ls-files', '-m', '-o', '--exclude-standard', '_posts']
        }, function (err, result, code) {
            if (err) {
                console.log('yes thats it');
                done(toUpdate);
            }
            if (result) {
                // all files in the result
                files = result.stdout.split('\n');
                // run over all of them
                files.forEach(function (fileName) {
                    // is it in posts?
                    if (fileName.match(/^_posts/)) {
                        if (fileName.match(/.md$/)) {
                            toUpdate.push(fileName);
                        }
                    }
                });
                done(toUpdate);
            }
        });
    },

    headerTextToObj = function (text) {
        var keys = text.split(/\r\n|\n/g).filter(function (element) {
                if (element === '---') {
                    return false;
                }
                return true;
            }).map(function (el) {
                return el.split(/:(.+)/)
            }),
        obj = {}
        keys.forEach(function (el) {
            obj[el[0]] = el[1];
        });
        return obj;
    },

    // get the header of the the given markdown data
    getHeader = function (data) {
        var startIndex = data.indexOf('---'),
        endIndex = data.indexOf('---', startIndex + 3),
        text = data.substr(startIndex, endIndex - startIndex + 3);
        return {
            startIndex: startIndex, // start index
            endIndex: endIndex, // end index
            text: text, // raw text
            // object form of header
            obj: headerTextToObj(text)
        };
    },

    // take a look at the given header obtained with getHeader, and update it's info.
    updateHeader = function (header) {
        var now = new Date(),
        pad = function (n) {
            return String('0' + n).slice(-2);
        };
        // set or change time updated to now.
        header.obj.updated = ' ' + now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
        // if we have a version number bump it.
        if ('version' in header.obj) {
            ver = header.obj.version.split('.');
            ver[ver.length - 1] = Number(ver[ver.length - 1]) + 1;
            header.obj.version = ver.join('.');
        } else {
            header.obj.version = ' 1.0';
        }
        // update text;
        header.text = '';
        for (var prop in header.obj) {
            header.text += prop + ':' + header.obj[prop] + '\r\n';
        }
        return header;
    },

    // read a file of the given index from an array of fileNames.
    read = function (files, index, done, write, commit) {
        done = done || function () {};
        write = write || false;
        fs.readFile(files[index], 'utf8', function (err, data) {
            var content,
            newText;
            header = updateHeader(getHeader(data));
            content = data.substr(header.endIndex, data.length - header.endIndex);
            newText = '---\r\n' + header.text + content;
            if (err) {
                console.log('error reading file');
                done();
            } else {
                console.log('id# ' + header.obj.id);
                console.log(header);
                console.log('write = ' + write);
                console.log('');
                console.log('');
                if (write) {
                    console.log('writing to file');
                    fs.writeFile(files[index], newText, function (err) {
                        var git_stage,
                        git_commit;
                        if (commit) {
                            console.log('yes commit');
                            git_stage = spawn('git', ['add', files[index]]);
                            git_stage.on('close', function (data) {
                                git_commit = spawn('git', ['commit', '-m', 'post-check;id#:' + header.obj.id + ';v:' + header.obj.version + ';']);
                                git_commit.on('close', function (data) {
                                    console.log('yes commit close');
                                    done();
                                });
                            });
                        } else {
                            console.log('read done');
                            done();
                        }
                    });
                } else {
                    console.log('not writing');
                }
            }
        });
        console.log('');
    };

    // read files
    //readFiles = function (files, callback, write) {
    readFiles = function (obj) {
        var index = 0,
        len = obj.files.length,
        onDone = function () {
            index += 1;
            if (index >= len) {
                obj.callback();
                // call the done given method
                //done();
            } else {
                // keep reading
                read(obj.files, index, onDone, obj.write, obj.commit);
            }
        };
        obj.callback = obj.callback || function () {};
        obj.commit = obj.commit || false;
        //obj.fail = obj.fail || function () {};
        read(obj.files, index, onDone, obj.write, obj.commit);
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    // Default task(s).
    grunt.registerTask('default', function () {

        console.log('must give a task name.');

    });

    // the find task
    grunt.registerTask('find', function () {

        var done = this.async();

        // just call find
        find(function (result) {

            console.log(result);

            done();

        });

    });

    // the read task
    grunt.registerTask('read', function () {

        var done = this.async();

        find(function (files) {

            if (typeof files === 'object') {

                if (files.length > 0) {

                    readFiles({

                        files: files,
                        callBack: function () {

                            console.log('done with read task.');

                            done();
                        },
                        write: false,
                        commit: false,
                        remote: false

                    });

                } else {

                    console.log('no files to read');

                }

            } else {

                console.log('files is not an object');

            }

        });

    });

    // update files but do not commit.
    grunt.registerTask('update', function () {

        var done = this.async();

        console.log('starting update task');

        find(function (files) {

            if (typeof files === 'object') {

                if (files.length > 0) {

                    readFiles({

                        files: files,
                        callBack: function () {

                            console.log('done with read task.');

                            done();
                        },
                        write: true,
                        commit: false,
                        remote: false

                    });

                } else {

                    console.log('no files to read');

                }

            } else {

                console.log('files is not an object');

            }

        });
    });

    // update files, commit, and push.
    grunt.registerTask('commit', function () {

        var done = this.async();

        console.log('commiting changes');

        find(function (files) {

            if (typeof files === 'object') {

                if (files.length > 0) {

                    readFiles({

                        files: files,
                        callBack: function () {

                            console.log('done with commit task.');

                            done();

                        },
                        write: true,
                        commit: true,
                        remote: false

                    });

                } else {

                    console.log('no files to read');

                }

            } else {

                console.log('files is not an object');

            }

        });
    });

};
