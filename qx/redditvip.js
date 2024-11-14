/*
去广告by@xream 解锁会员 by@ios151

[rewrite_local]
^https?:\/\/gql(-fed)?\.reddit\.com url script-response-body https://raw.githubusercontent.com/Mikephie/Script/main/qx/redditvip.js

[MITM]
hostname = gql.reddit.com, gql-fed.reddit.com

*/

// 处理请求
let isLoon = typeof $response !== 'undefined'; // 判断是否为 Loon 环境
let isSurge = typeof $http !== 'undefined'; // 判断是否为 Surge 环境

// 初始化响应体
let body = isLoon ? $response.body : null; // Loon 的响应体
if (isSurge) {
  body = $http.response.body; // Surge 的响应体
}

if (body) {
  try {
    // 解析 JSON
    let json = JSON.parse(body);

    // 去广告处理
    // 示例: 清除广告相关字段
    if (json) {
      json.isNsfw = false; // 设置 NSFW 为 false
      json.isNsfwMediaBlocked = false; // 设置 NSFW 媒体阻止为 false
      json.isNsfwContentShown = true; // 设置 NSFW 内容显示为 true

      // 清空广告字段
      if (json.commentsPageAds && Array.isArray(json.commentsPageAds)) {
        json.commentsPageAds = [];
      }

      if (json.node && typeof json.node === 'object') {
        if (json.node.adPayload) {
          delete json.node.adPayload; // 删除广告负载
        }
      }
    }

    // 解锁会员
    json.isPremiumMember = true;
    json.isSubscribed = true;
    json.isEmployee = true;
    json.skus = [{
      "kind": "Premium",
      "subscriptionType": "Premium",
      "name": "Premium Subscription",
      "description": "Mobile Annual Premium Subscription",
      "duration": { "amount": 1, "unit": "YEAR" },
      "id": "1",
      "quantity": "1",
      "renewInterval": "YEAR",
      "requiredPaymentProviders": ["APPLE_INAPP", "GOOGLE_INAPP"],
      "externalProductId": "com.reddit.premium_2",
      "promos": [],
      "tags": []
    }];

    // 其他字段
    json.has_gold_subscription = true;
    json.pref_autoplay = false;
    json.has_subscribed_to_premium = true;
    json.has_visited_new_profile = true;
    json.pref_video_autoplay = false;
    json.features = { "promoted_trend_blanks": false };
    json.is_mod = true;
    json.user_is_subscriber = true;
    json.hide_ads = true;
    json.is_gold = true;
    json.isBrandAffiliate = true;
    json.has_ios_subscription = true;
    json.seen_premium_adblock_modal = true;
    json.has_external_account = true;

    // 返回修改后的响应
    body = JSON.stringify(json);
  } catch (e) {
    console.log(e);
  }

  // 提交修改后的响应
  if (isLoon) {
    $done({ body: body }); // Loon
  } else if (isSurge) {
    $http.response.body = body; // Surge
    $done($http.response);
  }
} else {
  // 没有找到 body
  $done({});
}