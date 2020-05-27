
const dateformat = function(millisecond) {
  // var dateStr = "2020-03-01 01:34:10";
  var time = new Date(millisecond);
  var dateStr = time.getFullYear() + "-" + (time.getMonth() + 1) + "/" + time.getDate() + "/ " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
  var publishTime = Date.parse(dateStr.replace(/-/gi, "/")) / 1000,
    d_seconds,
    d_minutes,
    d_hours,
    d_days,
    timeNow = parseInt(new Date().getTime() / 1000),
    d,
    date = new Date(publishTime * 1000),
    Y = date.getFullYear(),
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  //小于10的在前面补0
  if (M < 10) {
    M = "0" + M;
  }
  if (D < 10) {
    D = "0" + D;
  }
  if (H < 10) {
    H = "0" + H;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  d = timeNow - publishTime;
  d_days = parseInt(d / 86400);
  d_hours = parseInt(d / 3600);
  d_minutes = parseInt(d / 60);
  d_seconds = parseInt(d);
  if (d_days > 0 && d_days < 3) {
    return d_days + "天前";
  } else if (d_days <= 0 && d_hours > 0) {
    return d_hours + "小时前";
  } else if (d_hours <= 0 && d_minutes > 0) {
    return d_minutes + "分钟前";
  } else if (d_seconds < 60) {
    if (d_seconds <= 0) {
      return "刚刚发表";
    } else {
      return d_seconds + "秒前";
    }
  } else if (d_days >= 3 && d_days < 30) {
    return M + "-" + D + " " + H + ":" + m;
  } else if (d_days >= 30) {
    return Y + "-" + M + "-" + D + " " + H + ":" + m;
  }
}

export default dateformat;
