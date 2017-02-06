# git-project

With **git-project**, you can manage the projects to checkout even if these are all in the same git repository. It uses the new feature available in git v1.7: *sparse-checkout*.

It is based on 2 elements:
* a file format to define your different projects inside the git repository
* a tool to read the config files and simplify git sparse-checkout commands (git clone is no more efficient)

> And for whose who don't think that one git repository for all project is good practise: [google did it](https://www.wired.com/2015/09/google-2-billion-lines-codeand-one-place/) so why not someon else.

## Getting started

In order to use **git-project**, follow these steps:

1. create a .gitprc config file in the repository you can to checkout
2. define your project in the .gitprc file
3. `npm install -g gitp` to install **git-project** on your computer
4. use command `gitp init [<ref>] <url>` to define the repository to pull
5. use command `gitp config project <project1> <project2>` to define the projects to pull
5. use command `gitp pull <ref> <branch>` and it will automatically pull what you want

For all others commands, use the standard git commands.
### Gitprc file

```yaml

url:

```
