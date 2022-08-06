window.addEventListener("load", function () {
  //一言
  fetch("https://v1.hitokoto.cn")
    .then((response) => response.json())
    .then((data) => {
      const hitokoto = document.getElementById("hitokoto_text");
      const from = document.getElementById("from");
      hitokoto.href = "https://hitokoto.cn/?uuid=" + data.uuid;
      hitokoto.innerText = data.hitokoto;
      from.innerHTML = "---" + data.from;
    })
    .catch(console.error);
  //一言

  //时间
  toDay();
  function toDay() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var weeks = date.getDay();
    var wek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var hour = date.getHours();
    hour = hour >= 10 ? hour : "0" + hour;
    var minute = date.getMinutes();
    minute = minute >= 10 ? minute : "0" + minute;
    var second = date.getSeconds();
    second = second >= 10 ? second : "0" + second;
    var today = document.querySelector(".time");
    today.children[0].innerHTML = year + "年" + (month + 1) + "月" + day + "日" + wek[weeks] + hour + ":" + minute + ":" + second;
  }
  setInterval(toDay, 1000);
  //时间

  var p = document.querySelector(".countDown");
  var start = document.querySelector(".start");
  var end = document.querySelector(".end");
  var study = 25 * 60;
  var r = 25 * 60;
  var studyTime = null;
  var reverse = 0;

  // 音乐播放
  var stop_music = document.querySelector(".stop_music");
  var Hint_panel = document.querySelector(".Hint_panel");
  stop_music.addEventListener("click", function () {
    audio.pause();
    Hint_panel.style.display = "none";
  });
  // console.log(stop_music);
  //获取时间
  var time = document.querySelector(".hardstudy");
  var relax = document.querySelector("#relaxed");
  var enter = document.querySelector(".enter");
  enter.addEventListener("click", function () {
    //console.log(time.value);
    //console.log(relax.value);
    study = time.value * 60;
    r = relax.value * 60;
  });
  //获取时间

  //按钮
  start.addEventListener("click", function () {
    if (!reverse) {
      studyTime = setInterval(timeStudy, 1000);
    } else {
      studyTime = setInterval(relaxTime, 1000);
    }
    console.log(reverse);
  });
  end.addEventListener("click", function () {
    clearInterval(studyTime);
    console.log(reverse);
  });
  //按钮

  //总时长

  var sum = 0;
  var sumTime = document.querySelector(".sumTime");
  var summ;
  pass();
  var old = localStorage.getItem("summm");
  var oldd = JSON.parse(old);
  pass();
  var oldDd = oldd.time;

  console.log("= " + oldd.time);
  studySumTime();

  //总时长

  //切换
  var down_item = document.querySelector(".down_item");
  var set_item = document.querySelector(".set_item");
  //目标日期
  var targetDate = document.querySelector(".target-date");
  var jDate = document.querySelector(".jDate");
  var jName = document.querySelector(".jName");
  var dateEnter = document.querySelector(".dateEnter");
  var jtargetArry = null;
  //切换
  var j_item = document.querySelector(".j_item");
  var down_item = document.querySelector(".down_item");
  var set_item = document.querySelector(".set_item");
  var itemSetting = document.querySelector(".itemSetting");
  var audio = this.document.querySelector("audio");
  set_item.addEventListener("click", function () {
    // j_item.children.style.display = "none";
    // console.log(j_item.children);
    for (var i = 0; i < itemSetting.children.length; i++) {
      itemSetting.children[i].style.display = "none";
      j_item.children[i].style.color = "wheat";
    }
    itemSetting.children[0].style.display = "block";
    set_item.style.color = "skyblue";
  });
  down_item.addEventListener("click", function () {
    for (var i = 0; i < itemSetting.children.length; i++) {
      itemSetting.children[i].style.display = "none";
      j_item.children[i].style.color = "wheat";
    }
    itemSetting.children[1].style.display = "block";
    down_item.style.color = "skyblue";
  });
  //切换

  dateEnter.addEventListener("click", function () {
    var jtargetTime = jDate.value;
    jtargetTime = jtargetTime.split("T");
    jtargetTime = jtargetTime[0] + " " + jtargetTime[1];
    var local = getDate();
    console.log(local);
    local.push({ name: jName.value, date: jtargetTime });
    var localDate = local[0].date;
    save(local);
    setInterval(targetTime, 1000);
    console.log(localDate);
  });
  targetTime();
  setInterval(targetTime, 1000);
  /*  // 删除
  var select = document.querySelector(".sel");
  var right = document.querySelector(".right");

  select.addEventListener("click", function () {
    // right.removeChild(targetDate);
    var content = getDate();
    console.log(content);
  });

  //删除 */

  //获取
  function getDate() {
    var data = localStorage.getItem("mubn");
    if (data !== null) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }
  function pass() {
    var data = localStorage.getItem("summm");
    if (data === null) {
      summ = {
        time: 0,
      };
      localStorage.setItem("summm", JSON.stringify(summ));
    }
  }
  function save(local) {
    localStorage.setItem("mubn", JSON.stringify(local));
  }

  function targetTime() {
    var local = getDate();

    var now = +new Date();
    var target = +new Date(local[0].date);

    var jTime = (target - now) / 1000;
    // console.log(jTime);
    var day = parseInt(jTime / 60 / 60 / 24);
    day = day >= 10 ? day : "0" + day;
    // console.log(day);
    var hour = parseInt((jTime / 60 / 60) % 24);
    hour = hour >= 10 ? hour : "0" + hour;
    // console.log(hour);
    var minute = parseInt((jTime / 60) % 60);
    minute = minute >= 10 ? minute : "0" + minute;
    var second = parseInt(jTime % 60);
    second = second >= 10 ? second : "0" + second;

    var one = document.querySelector("li");
    var list = document.querySelector(".list");
    one.innerHTML =
      "距离" +
      local[0].name +
      "还有" +
      day +
      "天" +
      hour +
      "小时  " +
      minute +
      "分" +
      second +
      "秒" +
      "<a href='javascript:;' style='margin-left: 50px;' class='sel'>删除</a>";
    var select = document.querySelector(".sel");

    select.addEventListener("click", function () {
      // console.log("23");
      list.removeChild(one);
      var content = getDate();
      console.log(content);
      content.pop();
      save(content);
    });
    //删除
    if (jTime <= 0) {
      one.innerHTML = "已经到期了" + "<a href='javascript:;' style='margin-left: 50px;' class='sel'>删除</a>";
    }
  }

  //目标日期

  function timeStudy() {
    p.innerHTML = "study" + study;
    study--;
    studySumTime();
    if (study < 0) {
      audio.play();
      Hint_panel.style.display = "block";
      console.log(Hint_panel);
      clearInterval(studyTime);
      p.innerHTML = "是时候休息了";
      reverse = 1;
      r = 0.1 * 60;
      studyTime = setInterval(relaxTime, 1000);
    }
  }
  function studySumTime() {
    summ = {
      time: oldDd + sum,
    };
    sum++;
    console.log(oldd.time);
    old = summ.time;
    localStorage.setItem("summm", JSON.stringify(summ));
    //分
    var minuter = parseInt((oldDd + sum) / 60);
    minuter = minuter > 10 ? minuter : "0" + minuter;
    // console.log(minuter + "min");
    //分
    //秒
    var second = parseInt((oldDd + sum) % 60);
    second = second > 10 ? second : "0" + second;
    //console.log(second + "s");
    //秒
    sumTime.innerHTML = minuter + "分" + second + "秒";
  }
  function relaxTime() {
    p.innerHTML = r;
    r--;
    if (r < 0) {
      clearInterval(studyTime);
      p.innerHTML = "休息结束了";
      reverse = 0;
      study = 0.1 * 60;
      studyTime = setInterval(timeStudy, 1000);
    }
  }
});
