const fs = require('fs-extra');
const path = require('path');
const git = require('simple-git');
const winston = require('winston');
const exec = require('child_process').exec;

const Serializer = require('./serializer');

function parseInitArguments(arg1, arg2, arg3) {
    var url = arg1;
    var callback = null;
    var ref = "origin";
    if (typeof arg2 === "function") {
        callback = arg2;
    } else if (typeof arg2 === "string") {
        ref = arg2;
    }

    if (typeof arg3 === "function" && typeof arg2 !== "function") {
        callback = arg3;
    }

    return {
        url, callback, ref
    };
}

module.exports = function (dirname) {

    var dirname = path.resolve(dirname);

    fs.ensureDirSync(dirname);

    var repository = git(dirname);

    var serializer = Serializer(dirname);

    return {
        init: function (url, ref, callback) {
            var {url, ref, callback} = parseInitArguments(url, ref, callback);
            repository
            .init()
            .addRemote(ref, url)
            .addConfig("core.sparseCheckout", true, function (err) {
                callback && callback(err);
            });
        },
        configureProjects: function (projects, callback) {
            var localConfig = serializer.loadLocalConfig();
            localConfig.projects = projects;
            serializer.saveLocalConfig(localConfig);
            serializer.generateSparseCheckout();
            callback && callback();
        },
        pull: function (ref, branch, callback) {
            // serializer.generateSparseCheckout();
            exec('git pull '+ref+' '+branch, (error, stdout, stderr) => {
              if (error) {
                  callback && callback (error, stdout, stderr);
              } else {
                  var localConfig = serializer.loadLocalConfig();
                  var refConfig = serializer.loadRefConfig();

                  serializer.generateSparseCheckout(refConfig, localConfig.projects);
                  exec('git pull '+ref+' '+branch, (error, stdout, stderr) => {
                    if (error) {
                        callback && callback (error, stdout, stderr);
                    } else {
                        repository
                        .checkout(branch, (error) => {
                            callback && callback (error);
                        });
                    }
                });
              }
            });
            // repository.pull(ref, branch);
        },
        update: function (callback) {
            var localConfig = serializer.loadLocalConfig();
            var refConfig = serializer.loadRefConfig();
            serializer.generateSparseCheckout(refConfig, localConfig.projects);
            callback && callback();
        }
    }
}
