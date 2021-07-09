## Git 常用命令
### git 一个分支完全替换另一个分支
转自：http://www.oschina.net/question/1993919_224813   
`git push origin develop:master -f `   
把本地的 `develop` 分支强制(`-f`)推送到远程 `master`   
   
但是上面操作，本地的 master 分支还是旧的，通常来说应该在本地做好修改再去 push 到远端，所以推荐如下操作   
   
```
git checkout master // 切换到旧的分支   
git reset --hard develop  // 将本地的旧分支 master 重置成 develop
git push origin master --force // 再推送到远程仓库
```

### git 一条龙操作
```
git branch -d master
git branch source
git branch --track gh-pages remotes/origin/gh-pages
git push -u origin source # 客户端首次提交source分支
git clone XXXXX
git pull
git add .
git commit -m 提交信息
git push origin master
git checkout master
git merge gh-pages
```

### git 解决冲突
```
git add index.html // 假如是index.html文件冲突，修改并提交单个文件
git commit -m 解决index.html文件冲突
git push origin master
```

### git 本地文件提交到github上
```
git init
git add . 
git commit -m "first commit"
git remote add origin 你的远程库地址  // 把本地库与远程库关联
git push -u origin master    // 第一次推送时
git push origin master  // 第一次推送后，直接使用该命令即可推送修改

// 出问题后：
git branch --set-upstream-to=origin/<branch> master
git pull origin master --allow-unrelated-histories
```

### git 基于指定分支aaa创建分支bbb
```
git checkout aaa
git pull origin aaa
git checkout -b bbb
git push origin bbb
```

### git 基于指定分支 aaa 的某次提交(commit)创建分支 bbb
```
git checkout aaa
git pull origin aaa
git checkout -b bbb <commitId>
git push origin bbb
```

### 使用bash 修改 commit 的作者信息
#### 修改 git 配置
```
git config --global user.email "youremail@googl.com"
git config --global user.name "your name"
```
#### 修复 git 历史提交信息
警告： 这个操作会破坏你的仓库历史， 如果你和别人在协同开发这个仓库，重写已发布的历史记录是一个不好的操作。建议只在紧急情况操作   
```
git filter-branch --env-filter '

OLD_EMAIL="your-old-email@example.com"
CORRECT_NAME="Your Correct Name"
CORRECT_EMAIL="your-correct-email@example.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```
#### 将修改后的仓库历史推到远程
```
git push --force --tags origin 'refs/heads/*'
```
### 删除分支
#### 删除远程分支
```
git push origin --delete mybranch
```
#### 删除本地分支(-D适用于删除未合并分支)
```
git branch -d mybranch
git branch -D mybranch
```

### 删除未监视的文件untracked files
#### 删除 untracked files
```
git clean -f
```
#### 连 untracked 的目录也一起删掉
```
git clean -fd
```
#### 连 gitignore 的untrack 文件/目录也一起删掉 （慎用，一般这个是用来删掉编译出来的 .o之类的文件用的）
```
git clean -xfd
```
#### 在用上述 git clean 前，强烈建议加上 -n 参数来先看看会删掉哪些文件，防止重要文件被误删
```
git clean -nxfd
git clean -nf
git clean -nfd
```

### fork 分支与源分支同步代码
#### 首先保证本地仓库的 upstream 是源项目的 URL，若没有则添加：
```
git remote add upstream URL
```
#### 然后利用 fetch 和 merge 合并 upstream 的 master 分支：
```
git fetch upstream
git merge upstream/master
```
#### 首此时本地的 master 分支就更新至 upstream 的 master 版本。然后利用 push 将本地分支覆盖到 git 远程分支上：
```
git push origin master:master
```
#### git fetch 的简单用法: 更新远程代码到本地仓库
```
# 查看远程仓库
git remote -v
# origin    git@gitlab.liquidnetwork.com:zyj/saiyan.git (fetch)
# origin    git@gitlab.liquidnetwork.com:zyj/saiyan.git (push)
# upstream    git@gitlab.liquidnetwork.com:backend/saiyan.git (fetch)
# upstream    git@gitlab.liquidnetwork.com:backend/saiyan.git (push)


# 拉取远程代码到本地
git pull upstream master
```

### git 移除上一次的 commit 中误添加的文件
转自：https://www.cnblogs.com/Sir-Lin/p/8243999.html   
`git reset --mixed HEAD~1 `   
这操作即取消上次的 `commit`    

### git pull 失败 ,提示： fatal: refusing to merge unrelated histories 错误
转自：https://www.centos.bz/2018/03/git-%E5%87%BA%E7%8E%B0-fatal-refusing-to-merge-unrelated-histories-%E9%94%99%E8%AF%AF/   
`git pull origin master --allow-unrelated-histories`   
这操作即强制把不相干的远程 git 库与本地库合起来    

### 本地关联远程分支
`git branch --set-upstream-to=origin/remote_branch  your_branch
`

### 其他
#### git报错：Please move or remove them before you can switch branches.
```
git clean  -d  -fx
```
注：    
1. x ：表示删除忽略文件已经对git来说不识别的文件    
2. d: 删除未被添加到git的路径中的文件    
3. f: 强制执行   
