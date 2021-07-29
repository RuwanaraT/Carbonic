               
## Carbonic

### Guide for Contributors


#### Using git-bash

1. Clone a repository<br>
   * `git clone https://github.com/RuwanaraT/Carbonic.git`<br>
   * `cd Carbonic` -> Go inside of the Carbonic folder 

2. Create a new branch and switch to a created branch <br>
   * `git checkout -b <branch name>` -> Create a new branch <br>
   * `git checkout <branch name>` -> switch to a created branch

   * Make sure to always check which branch currently you are in, using “git status” before you start working!


3. Merage a branch <br>

   * After complete your work on the branch you shoud merage your working branch into main branch

   ```
    git add . -> Add all created files to the git repository
    git commit -m '<message>' -> commit your staged content as a new commit snapshot
    git push -u origin <branch name> - Transmit local branch commits to the remote repository branch
    eg : git push -u origin main
    ```
4. Go to GitHub and create new pull request

git-cheat-sheet can be found [here](https://education.github.com/git-cheat-sheet-education.pdf) <br>

#### Using Git-Hub Dekstop 

##### Initial Steps #####

1. Clone or download a repository.
2. Open GitHub Dekstop.
2. Select relevant current repository.
3. Make sure to be in your respective branch.

               ` After doing changes `

4. select change files.
5. put a commit message.
7. push to your branch.
8. push to main branch.
9. create new pull request.


##### Pull changes were made, in to your branch #####

1. Go to main branch
2. Click 'Fetch origin'
3. Change to your branch
4. Click Choose a branch to merge into <your brach name>
5. merge
6. push origin
 

##### Accept a pull request on browser #####


1. Click 'Add your review'.
2. Check 'viewed' check boxes.
3. Click 'Review changes'.
4. Leave a comment.
5. Select 'Approve'.
6. Click 'Submit review'.
7. Merge pull request.
