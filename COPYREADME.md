…or create a new repository on the command line

```shell
echo "# live-chat" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:p0ssword/live-chat.git
git push -u origin main
```

…or push an existing repository from the command line

```shell
git remote add origin git@github.com:p0ssword/live-chat.git
git branch -M main
git push -u origin main
```