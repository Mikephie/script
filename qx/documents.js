/*        
        ➪：脚本名称: Documents （永久会员）

        ★：解锁永久🆅🅸🅿

        𖣘： 🅜ⓘ🅚ⓔ🅟ⓗ🅘ⓔ

𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

[rewrite_local]
https://license.pdfexpert.com/api/2.0/documents/subscription/refresh url script-request-body https://raw.githubusercontent.com/Mikephie/Script/main/qx/documents.js

[mitm]
hostname = *.pdfexpert.com

*************************************/


var body = JSON.parse($request.body);
body = {
  "token": "33d3aced-fced-4c92-9971-2d42afc7c94f",
  "id": "0F0394E3-785B-4C12-8B43-AE9DC2722F68",
  "chargingPlatform": "iOS AppStore",
  "deviceInfo": {
    "amplitudeDeviceId": "E4B62F7D-CFE8-47EF-8BE0-44E8679C996B"
  },
  "bundleId": "com.readdle.ReaddleDocsIPad",
  "receiptData": "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"
};
$done({
  "body": JSON.stringify(body)
});