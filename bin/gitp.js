#!/usr/bin/env node

'use strict';

const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');

const gitp = require('../src/git-project')(process.cwd());

let availableCommands = {
    init: function (args) {

        if (args.length < 1) {
            console.log("gitp init [<ref>] <url>");
            process.exit(2);
        }

        var url = '';
        var ref = 'origin';
        if (args.length > 1) {
            ref = args[0];
            url = args[1];
        } else {
            url = args[0];
        }


        gitp.init(url, ref);
    },
    config: function (args) {
        if (args.length < 2 || args[0] != 'project') {
            console.log("gitp config project <project1> [<project2>]");
            process.exit(2);
        }

        var projects = args;
        projects.splice(0, 1);
        gitp.configureProjects(projects);
    },
    pull: function (args) {
        if (args.length < 2) {
            console.log("gitp pull <ref> <branch>");
            process.exit(2);
        }
        var ref = args[0];
        var branch = args[1];
        gitp.pull(ref, branch, function (err, stdout, stderr) {
            if (err) {
                console.log(err);
            }
            if (stdout) {
                console.log(stdout);
            }
            if (stderr) {
                console.log(stdout);
            }
        });
    },
    update: function (args) {
        gitp.update();
    }
}

// console.log(process.argv);

if (process.argv.length < 3) {
    console.log("not command found");
    process.exit(2);
}

let args = process.argv;

let command = args[2];
args.splice(0, 3);

if (!availableCommands[command]) {
    console.log("command "+command+" not found");
    process.exit(2);
}

availableCommands[command](args);

// console.log(command, args);
