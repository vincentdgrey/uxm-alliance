# Ver el valor efectivo (el que se usará en este repo)
git config user.name
git config user.email

# Ver de dónde viene cada valor (local, global o system)
git config --show-origin user.name
# file:/home/vincent/.gitconfig   Earth Controls
git config --show-origin user.email
# file:/home/vincent/.gitconfig   earth-controls.spa@outlook.com

# dedicade email username

git config --global user.email "23156575+edwin-coder-arquitech@users.noreply.github.com"

git commit --amend --reset-author --no-edit
