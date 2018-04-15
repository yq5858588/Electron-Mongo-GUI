# Electron Mongo GUI
终于可以为开源做贡献了！
自己用nodejs开发的一个简单的数据库的界面管理软件，本来是觉得市面上对于mongo数据库的界面管理软件很少，想做一个支持mongo的，但是学nodejs不久，不知道怎么下手，所以先做了对mysql的支持
现在暂时支持mysql的查询库  查询表  后期加入 对数据库还有表的操作  
再后期希望加入对mongo数据库的支持，和其他数据库的支持
再此我也希望各位大牛能加入进来，为开源做点事情，把软件的界面以及对其他数据库的支持补充完善
项目码云地址为：https://gitee.com/yq5858588/Electron-Mongo-GUI
软件安装包下载地址：https://pan.baidu.com/s/1k6aBR2WPtwFLq3LUwR7SwQ


npm install electron-builder -g  //安装打包环境

electron-builder --version  //查看打包环境版本

electron-builder -w     //打包命令


//打包的时候注意icon的大小  必须大于256*256

#更新日志

##2018-04-15：
1.修改了界面右上角的系统信息内容
2.界面现在改成了无边框模式
3.注册了调试工具的快捷键ctrl+shift+a
4.无边框界面下 可以拖动界面最上边和最下边进行程序的拖动操作
5.界面下边添加了版权信息
6.给软件添加了系统托盘功能

##2018-04-14
1.用了一天的时间初步完成了软件界面的开发以及和mysql数据库的查询，其中包括查询库，查询表



