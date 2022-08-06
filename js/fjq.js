window.addEventListener("load", function () {
  // var time = prompt("请输入学习分钟")
  // var relax = prompt("请输入休息时间")
  var p = document.querySelector("p");
  var start = document.querySelector(".start");
  var end = document.querySelector(".end");
  var study = 25 * 60;
  var r = 25 * 60;
  var studyTime = null;
  var reverse = 0;
  //总时长
  var sum = 0;
  var sumTime = document.querySelector(".sumtime");
  var summ;
  var old = localStorage.getItem("summm");
  var oldd = JSON.parse(old);
  //console.log(oldd.time);
  var oldDd = oldd.time;

  //localStorage.setItem("summm", JSON.stringify(summ))
  //localStorage.getItem(summ)
  //   console.log(summ.time);
  //总时长

  ///timeStudy();
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
  //一言
  fetch("https://v1.hitokoto.cn")
    .then((response) => response.json())
    .then((data) => {
      const hitokoto = document.getElementById("hitokoto_text");
      hitokoto.href = "https://hitokoto.cn/?uuid=" + data.uuid;
      hitokoto.innerText = data.hitokoto;
    })
    .catch(console.error);
  //一言

  //今日
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
    var today = document.querySelector(".date");
    today.children[0].innerHTML = year + "年" + month + "月" + day + "日" + wek[weeks] + hour + ":" + minute + ":" + second;
  }
  setInterval(toDay, 1000);

  //今日
  //时间的函数
  function timeStudy() {
    p.innerHTML = "study" + study;
    // console.log(study);
    study--;
    // sum = sum + (time.value * 60 - study);
    // console.log(sum);

    summ = {
      time: oldDd + sum,
    };
    sum++;
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
    if (study < 0) {
      clearInterval(studyTime);
      p.innerHTML = "是时候休息了";
      reverse = 1;
      r = 0.1 * 60;
      studyTime = setInterval(relaxTime, 1000);
    }
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
  //var b = document.body;
  // console.log(study);
  //  var p = document.createElement(p);
  // b.appendChild(p);

  //时间的函数
});
