window.onload = function () {
  // 顶部搜索
  search();
  // 轮播图
  banner();
  // 倒计时
  downTime();
};

var search = function () {
  var searchBox = document.querySelector(".jd_search");
  var banner = document.querySelector(".jd_banner");
  var bannerHeight = banner.offsetHeight;

  // 监听页面滚动事件
  document.onscroll = function () {
    // 获取页面滚动高度
    var scrollTop = document.documentElement.scrollTop;
    // 兼容获取方法
    // var scrollTop = document.body.scrollTop;
    // var scrollTop = document.pageYOffset;
    // 默认透明度
    var opacity = 0;
    if (scrollTop < bannerHeight) {
      opacity = scrollTop / bannerHeight * 0.85;
    } else {
      opacity = 0.85;
    }
    searchBox.style.background = "rgba(201, 21, 35," + opacity + ")";

  }
};

var banner = function () {
  // 1.自动轮播图且无缝（定时器、过度）
  // 2.点要随着图片的轮播而改变（根据索引切换）
  // 3.滑动效果（利用touch事件）
  // 4.滑动结束的时候（如果滑动的距离不超过屏幕的1/3  吸附回去，过度）
  // 5. 滑动结束的时候（如果滑动的距离超过屏幕的1/3 切换到上一张或下一张，根据滑动的方向，过度）

  // 轮播图
  var carrousel = document.querySelector(".jd_banner");
  // 屏幕的宽度
  var screenWidth = carrousel.offsetWidth;
  // 图片容器
  var imageBox = carrousel.querySelector("ul:first-child");
  // 点容器
  var pointBox = carrousel.querySelector("ul:last-child");
  // 所有的点
  var points = pointBox.querySelectorAll("li");

  // 添加过度效果
  var addTransiton = function () {
    imageBox.style.transition = "all .2s";
    imageBox.style.webkitTransition = "all .2s";
  };
  // 移除过度效果
  var removeTransition = function () {
    imageBox.style.transition = "none";
    imageBox.style.webkitTransition = "none";
  };
  //设置移动距离
  var setTranslateX = function (translateX) {
    imageBox.style.transform = "translateX(" + translateX + "px)";
    imageBox.style.webkitTransform = "translateX(" + translateX + "px)";
  };
  // 设置点的方法
  var setPoint = function () {
    for (var i = 0, obj = null; i < points.length; i++) {
      obj = points[i];
      obj.classList.remove('now');
    }
    points[index - 1].classList.add("now");
  };

  // 程序的核心 index
  var index = 1;

  var timer = setInterval(function () {
    index++;
    // 加过度
    addTransiton();
    // 做位移
    setTranslateX(-index * screenWidth);
  },2000);

  imageBox.addEventListener("transitionend", function () {
    if (index >= 9) {
      index = 1;
      // 清除过度，瞬间定位
      removeTransition();
      setTranslateX(-index * screenWidth);
    } else if (index <= 0) {
      index = 8;
      // 清除过度，瞬间定位
      removeTransition();
      setTranslateX(-index * screenWidth);
    }

    // 根据索引设置点
      // 此时此刻 index 的取值范围 1-8
      // 因此点的索引为 index - 1
    setPoint();
  });

  // 绑定touch事件
  var startX = 0;
  var distanceX = 0;
  var isMove = false;

  imageBox.addEventListener("touchstart", function (e) {
    clearInterval(timer);
    // 手指触摸到屏幕的x坐标
    startX = e.touches[0].clientX;
  });

  imageBox.addEventListener("touchmove", function (e) {
    // 手指移动时的x坐标
    var moveX = e.touches[0].clientX;
    // 计算移动位移
    distanceX = moveX - startX;
    // 元素将要的定位 = 当前定位 + 手指移动的位移
    var translateX = -index * screenWidth + distanceX;
    // 因为前面加了0.2s的过度会导致延迟 所以需要清除过度,再做位移
    removeTransition();
    setTranslateX(translateX);
    isMove = true;

  });

  imageBox.addEventListener("touchend", function (e) {
    if (isMove) {
      if (Math.abs(distanceX) < screenWidth / 3) {
        // 吸附
        addTransiton();
        setTranslateX(-index * screenWidth);
      } else {
        // 切换
        // 右滑 上一张，左滑 下一张(根据distanceX值的正负判断滑动方向，负值左滑，正值右滑）
        if (distanceX > 0) {
          index--;
        } else {
          index++;
        }
        addTransiton();
        setTranslateX(-index * screenWidth);
      }
    }
    // 参数重置
    startX = 0;
    distanceX = 0;
    isMove = false;
    // 开启定时器
    clearInterval(timer);
    timer = setInterval(function () {
      index++;
      // 加过度
      addTransiton();
      // 做位移
      setTranslateX(-index * screenWidth);
    },2000);
  });

};

var downTime = function () {
  // 2小时倒计时
  var time = 2 * 60 * 60;
  var spans = document.querySelectorAll(".time span");

  var timer = setInterval(function () {
    time--;
    // 格式化时间
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);
    var s = time % 60;

    // 更改DOM元素
    spans[0].innerHTML = Math.floor(h / 10);
    spans[1].innerHTML = h % 10;
    spans[3].innerHTML = Math.floor(m / 10);
    spans[4].innerHTML = m % 10;
    spans[6].innerHTML = Math.floor(s / 10);
    spans[7].innerHTML = s % 10;

    // 当倒计时为0时，清除浮动
    if (time <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};