const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

module.exports = function (dirname) {

    let localConfigFilename = path.join(dirname, '.gitprc.local');
    let refConfigFilename = path.join(dirname, '.gitprc');
    let gitSparseCheckoutFilename = path.join(dirname, '.git/info/sparse-checkout');

    return {
        saveLocalConfig: function (config) {
            var content = yaml.safeDump(config);
            fs.writeFileSync(localConfigFilename, content);
        },
        loadLocalConfig: function () {
            try {
                fs.accessSync(localConfigFilename, fs.R_OK);
                var content = fs.readFileSync(localConfigFilename, 'utf8');
                return yaml.safeLoad(content);
            } catch (e) {
                return {};
            }
        },
        loadRefConfig: function () {
            try {
                fs.accessSync(refConfigFilename, fs.R_OK);
                var content = fs.readFileSync(refConfigFilename, 'utf8');
                return yaml.safeLoad(content);
            } catch (e) {
                return {};
            }
        },
        generateSparseCheckout: function (config, selectedProjects)  {
            // console.log(config);
            if (!selectedProjects) {
                selectedProjects = [];
            }
            var paths = [ '.gitprc' ];

            // console.log(config.default, typeof config.default);
            // console.log(config.projects.project1);

            if (config) {

                if (typeof config.default === "object") {
                    paths = paths.concat(config.default);
                    // console.log('ok', paths);

                } else if (typeof config.default === "string") {
                    paths.push(config.default);
                }
            }

            for (var id in selectedProjects) {
                var selectedProject = selectedProjects[id];
                // console.log(selectedProject);
                // console.log(config.projects);

                if (config && config.projects && config.projects[selectedProject]) {
                    // console.log(config.projects[selectedProject]);
                    var path = config.projects[selectedProject];
                    if (typeof path === "object") {
                        paths = paths.concat(path);
                    } else if (typeof path === "string") {
                        paths.push(path);

                    }

                } else {
                    throw 'Project "'+selectedProject+'" not found';
                }
            }
            // console.log(paths);
            fs.writeFileSync(gitSparseCheckoutFilename, paths.join('\n'));
        }

    };
};
