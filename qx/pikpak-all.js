/*        
        ➪：脚本名称: PikPak （永久会员）

        ★：解锁永久🆅🅸🅿

        𖣘： 🅜ⓘ🅚ⓔ🅟ⓗ🅘ⓔ

𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

[rewrite_local]

^https:\/\/api-drive\.mypikpak\.com\/vip\/v1\/allSubscriptionStatus url script-response-body https://raw.githubusercontent.com/Mikephie/Script/main/qx/pikpak-sub.js
^https:\/\/user\.mypikpak\.com\/v1\/user\/me url script-response-body https://raw.githubusercontent.com/Mikephie/Script/main/qx/pikpak-user.js
^https:\/\/api-drive\.mypikpak\.com\/vip\/v1\/vip\/info url script-response-body https://raw.githubusercontent.com/Mikephie/Script/main/qx/pikpak-vip.js
^https:\/\/api-drive\.mypikpak\.com\/vip\/v1\/space\/list\?type=space url script-response-body https://raw.githubusercontent.com/Mikephie/Script/main/qx/pikpak-vipdrive.js
^https:\/\/(api-drive|user)\.mypikpak\.com\/(vip\/v1\/(allSubscriptionStatus|vip\/info|space\/list\?type=space)|v1\/user\/me)$ url script-request-header https://raw.githubusercontent.com/Mikephie/Script/main/qx/pikpaktk.js 

[mitm] 
hostname = *.mypikpak.com

*******************************/

