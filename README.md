# git-project

When you have a multi-projects git repository, you may want to checkout only one part. It is possible with the new feature available in git v1.7: *sparse-checkout* but it is still painful.

With **git-project**, manage your projects in the git to easily define what you want to checkout.

It is based on 2 elements:
* a file format to define your different projects inside the git repository
* a tool to read the config files and simplify git sparse-checkout commands (git clone is no more efficient)

*The goal is not replace git but simplify its management for multi-projects repository.*

> And for whose who don't think that one repository for all project is good practise: [google did it](https://www.wired.com/2015/09/google-2-billion-lines-codeand-one-place/) so why not someone else.

## Install

```bash
# as a node module
npm install git-project

# as a cli
npm install -g git-project
```


## Getting started

In order to use **git-project**, follow these steps:

### Define your project in the repository

On your repository:

1. create a .gitprc config file in the repository you can to checkout
2. define your project in the .gitprc file (see [example](https://github.com/thibaultfriedrich/git-project-example/blob/master/.gitprc))

> The syntax of the config file is YAML.

### Checkout the projects you want

Then to checkout only targeted projects in a empty directory:

#### As a CLI

1. `npm install -g git-project` to install **git-project** on your computer
2. use command `gitp init [<ref>] <url>` to define the repository to pull
3. use command `gitp config project <project1> <project2>` to define the projects to pull
4. use command `gitp pull <ref> <branch>` and it will automatically pull what you want

> Only this 3 commands exists, use standard git commands for other operations.

#### As a node module

```javascript
var gitp = require('git-project')(<dirname>);

gitp.init(<url>, [<ref>,] callback);
gipt.configureProjects([<project1>, <project2>, ..], callback);
gitp.pull(<ref>, <branch>, callback);
