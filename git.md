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
