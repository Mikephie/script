/*        
        ➪：脚本名称: 海报制作大师 （永久会员）

        ★：解锁永久🆅🅸🅿

        𖣘： 🅜ⓘ🅚ⓔ🅟ⓗ🅘ⓔ

𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

[rewrite_local] 

^https?:\/\/poster\.leminet\.cn\/v01\/profile url script-response-body https://raw.githubusercontent.com/Rnik666/YJTJS/main/HBZZDS.js

[MITM]
hostname = poster.leminet.cn

var mikephie = JSON.parse($response.body);

    mikephie = {
  "success" : true,
  "result" : {
    "headImg" : "https://i.ibb.co/f1cgnGT/IMG-1215.jpg",
    "dataId" : "00000000000000000000",
    "appleUserEmail" : "mikephiemy@gmail.com",
    "wordage" : 7777777,
    "mobile" : "Mikephie",
    "inviteCode" : "000000",
    "vipGroupInfos" : [
      {
        "groupType" : "TYPE_ONE",
        "vipType" : "VIP",
        "autoPay" : "NO"
      }
    ],
    "type" : "VIP", 
    "vipExpireTime" : "2088-08-08 08:08:08",
    "vipExpireDays" : 99999999,
    "registerTime" : "2022-09-09 03:20:32",
    "nickname" : "Mikephie",
    "email" : "mikephiemy@gmail.com",
    "remainTimeSeconds" : 99999,
    "realnameStatus" : "NO",
    "times" : 77777777
  },
  "returnCode" : "200",
  "timeOut" : false
}

$done({body : JSON.stringify(mikephie)});