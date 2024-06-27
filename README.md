# Documentation for WSO2 API Platform for Kubernetes

## Prerequisites
### Ubuntu

#### Add the required repositories and updating:
The first step is to add the required repositories and update the system. The command `sudo add-apt-repository ppa:deadsnakes/ppa` adds the PPA (Personal Package Archive) maintained by the Python packages team, and the `sudo apt-get update` command updates the packages list on the Ubuntu system.


#### Install Python 3.10:
The next step is to install Python 3.10 on Ubuntu.
```bash
sudo apt install python3.10 python3.10-distutils
```
Verify the installation by checking the version of Python 3.10:

If installation is successful, `python3.10 --version` should give the output `Python 3.10.10`


#### Install pip:
After installing Python, the next step is to install Pip, the package installer for Python. 
```bash
curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10
```
If you get a warning to update the path, it is required to do so. You can add the following line to your shell configuration file (e.g., .bashrc, .zshrc) to update the PATH environment variable:
```bash
export PATH="$PATH:/home/<your-user-name>/.local/bin"
```

This ensures that the Pip binaries are added to the PATH so that you can use Pip to install packages without specifying the full path to the binary.

```bash
pip3.10 --version
````

It should give the output `pip 23.0.1 from <path-to-pip> (python 3.10)`.


### macOS

#### Installing Python 3.10
1. Download the latest version of Python 3.10 from the official website (https://www.python.org/downloads/macos/).

2. Double-click the downloaded package to start the installation process.

3. Follow the on-screen instructions to complete the installation. Make sure to select "Install for all users" and "Add Python 3.10 to PATH" options.

4. After the installation is complete, open the Terminal app.

5. Type `python3.10 --version` or `python3.10 -V` in the Terminal and press Enter. If Python 3.10 is installed correctly, you should see the version number printed in the Terminal.

#### Installing pip
Open the Terminal app.

Copy and paste the following command into the Terminal and press Enter:

```bash
curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10
```
This command will download and install the latest version of pip for Python 3.10.

After the installation is complete, type `pip3.10 --version` or `pip3.10 -V` in the Terminal and press Enter. If pip is installed correctly, you should see the version number printed in the Terminal.

## Installing and Running mkdocs
Once you complete the prerequisite the following steps are common to both macOS and Ubuntu.

First change directory to the `en` folder.

#### Install MkDocs:
The next step is to install MkDocs, a static site generator that is used to create documentation sites.
```bash
pip3.10 install mkdocs==1.4.2
```
#### Install the MkDocs plugins:
In order to use some of the advanced features of MkDocs, you need to install some plugins. The following commands install the required plugins:

Method 1. Using requirements.txt

```bash
pip3.10 install -r requirements.txt
```

Method 2. Individually.

```bash
pip3.10 install mkdocs==1.4.2
pip3.10 install Pygments==2.14.0
pip3.10 install mkdocs-material==9.1.2
pip3.10 install pymdown-extensions==9.10
pip3.10 install mkdocs-minify-plugin==0.6.2
pip3.10 install mkdocs-markdownextradata-plugin==0.2.5
pip3.10 install mkdocs-redirects==1.2.0
pip3.10 install pathlib==1.0.1
pip3.10 install markdown-include==0.8.1
pip3.10 install markdown==3.2.1
pip3.10 install mkdocs-exclude==1.0.2
pip3.10 install jinja2==3.1.2
```

These plugins provide support for syntax highlighting, a Material Design theme, extended Markdown syntax, and various other features.

#### Running MkDocs
Once you have installed MkDocs and the required plugins, you can start a local development server by running the following command. 
```bash
python3.10 -m mkdocs serve
```
This command serves the documentation site locally, allowing you to preview changes as you make them.

#### Build for Production
To build the site for production, run the following command.

```bash
python3.10 -m mkdocs build
```

This generates the static site files in the site directory, which can be deployed to a web server.

### Trouble shooting
##### Error while installing minify plugin.
Solution: Run the following and retry.

```bash
pip3.10 install --upgrade setuptools
```

##### Tabs are not rendering properly.
Follow the new syntax. https://squidfunk.github.io/mkdocs-material/reference/content-tabs/?h=tabs#usage

When the tabs are supposed to render as child elements of a numbered list, fixing the indentation will fix most of the issues. The default space for indentation is 4 spaces.
