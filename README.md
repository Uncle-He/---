# 移动端jd首页和分类页
移动端的标准适配方案和流式布局

# 技能点
**首页**
<div align=center><img src="https://github.com/Uncle-He/m-jd-index/blob/master/media/jd-index.png" width=50% /></div>
* 适配方案
   * 标准适配
* 布局
   * 流式布局
* 顶部搜索栏
   * 双飞翼布局
* 轮播图
   * 原生js编写
   * 移动端touch事件
   * 当拖动轮播图不足图片的1/3时，吸附回去
   * 当拖动轮播图超过图片的1/3时，跳到下一张或上一张
   * 点按钮随轮播图的变化而变化
* 倒计时
   * 当DOM元素加载完成时，倒计时按照预设的时间开始倒计时
   

**分类页**
<div align=center><img src="https://github.com/Uncle-He/m-jd-index/blob/master/media/category.png" width=50% /></div>
* 适配方案
   * 标准适配
* 布局
   * 通栏布局（自适应）
* 内容区域
   * 两栏自适应布局（左栏float:left;右栏overflow:hidden;触发BFC，绝对绝缘）
* 左侧分类菜单栏
   * 借助iscroll插件实现区域滚动效果
* 右侧分类内容展示栏
   * 借助iscroll插件实现区域拱洞效果，内容自适应
