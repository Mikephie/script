/**************************************

// iTunes-系列解锁合集（合并版）
// 更新日期：2024-09-10
// 脚本作者：mikephie (重构与合并由 AI 辅助)
// 电报频道：https://t.me/mikephie

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/Mikephie/Script/main/qx/iTunes.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/

const EXPIRES_DATE_MS = "3742762088000";   // 2088-08-08 08:08:08 GMT
const EXPIRATION_DATE = "2088-08-08 08:08:08 Etc/GMT";
const PURCHASE_DATE_MS = "1729856759000";  // 2024-08-08 08:08:08 GMT
const PURCHASE_DATE = "2024-10-25 04:45:59 Etc/GMT";
const TRANSACTION_ID = "300002066031506";

const appList = {
  // 第一个脚本的应用列表
  'ScreenRecord': { method: 'v1', product_id: 'https://t.me/mikephie' },
  'iClear': { method: 'v1', product_id: 'com.youthpe.retake.yearly' },
  
  // 第二个脚本的应用列表
  'Cam Translator': { method: 'v2', cm: 'timed', hx: 'hxpbda', id: "co.vulcanlabs.pictranslator.weekly8", ids: "co.vulcanlabs.pictranslator.offlineweekly1", latest: "mikephie" },
  'com.iuuapp.audiomaker': { method: 'v2', cm: 'timed', hx: 'hxpbda', id: "com.iuuapp.audiomaker.cloud.year", ids: "com.iuuapp.audiomaker.removeads", latest: "mikephie" },
  'com.alphamobiletech.bodyApp': { method: 'v2', cm: 'timeb', hx: 'hxpda', id: "Bodyapp_Forever", latest: "mikephie" },
  // 注意：有些应用在两个列表中都出现了，这里保留了第二个脚本的版本
};

function createReceiptV1(productId) {
  return {
    "quantity": "1",
    "purchase_date_ms": PURCHASE_DATE_MS,
    "expires_date": EXPIRATION_DATE,
    "expires_date_pst": EXPIRATION_DATE.replace("Etc/GMT", "America/Los_Angeles"),
    "is_in_intro_offer_period": "false",
    "transaction_id": TRANSACTION_ID,
    "is_trial_period": "false",
    "original_transaction_id": TRANSACTION_ID,
    "purchase_date": PURCHASE_DATE,
    "product_id": productId,
    "original_purchase_date_pst": PURCHASE_DATE.replace("Etc/GMT", "America/Los_Angeles"),
    "in_app_ownership_type": "PURCHASED",
    "subscription_group_identifier": "20431945",
    "original_purchase_date_ms": PURCHASE_DATE_MS,
    "web_order_line_item_id": TRANSACTION_ID,
    "expires_date_ms": EXPIRES_DATE_MS,
    "purchase_date_pst": PURCHASE_DATE.replace("Etc/GMT", "America/Los_Angeles"),
    "original_purchase_date": PURCHASE_DATE
  };
}

function createReceiptV2(productId) {
  return {
    "quantity": "1",
    "purchase_date_ms": PURCHASE_DATE_MS,
    "is_in_intro_offer_period": "false",
    "transaction_id": TRANSACTION_ID,
    "is_trial_period": "false",
    "original_transaction_id": TRANSACTION_ID,
    "purchase_date": PURCHASE_DATE,
    "product_id": productId,
    "original_purchase_date_pst": PURCHASE_DATE.replace("Etc/GMT", "America/Los_Angeles"),
    "in_app_ownership_type": "PURCHASED",
    "subscription_group_identifier": "20757857",
    "original_purchase_date_ms": PURCHASE_DATE_MS,
    "web_order_line_item_id": "300000952690970",
    "expires_date_ms": EXPIRES_DATE_MS,
    "purchase_date_pst": PURCHASE_DATE.replace("Etc/GMT", "America/Los_Angeles"),
    "original_purchase_date": PURCHASE_DATE,
    "expires_date": EXPIRATION_DATE,
    "expires_date_pst": EXPIRATION_DATE.replace("Etc/GMT", "America/Los_Angeles")
  };
}

function processAppV1(appInfo, bundleId) {
  const { product_id } = appInfo;
  const receipt = createReceiptV1(product_id);
  
  return {
    "receipt": {
      "in_app": [receipt]
    },
    "latest_receipt_info": [receipt],
    "pending_renewal_info": [{
      "product_id": product_id,
      "original_transaction_id": TRANSACTION_ID,
      "auto_renew_product_id": product_id,
      "auto_renew_status": "1"
    }],
    "latest_receipt": "mikephie"
  };
}

function processAppV2(appInfo, bundleId) {
  const { cm, hx, id, ids, latest } = appInfo;
  let data;

  switch (cm) {
    case 'timea':
      data = [createReceiptV2(id)];
      break;
    case 'timeb':
      data = [{ ...createReceiptV2(id), expires_date: undefined, expires_date_pst: undefined, expires_date_ms: undefined }];
      break;
    case 'timec':
      data = [];
      break;
    case 'timed':
      data = [createReceiptV2(ids), createReceiptV2(id)];
      break;
  }

  let response = {
    "receipt": {
      "in_app": data
    },
    "latest_receipt_info": data,
    "pending_renewal_info": [{
      "product_id": id,
      "original_transaction_id": TRANSACTION_ID,
      "auto_renew_product_id": id,
      "auto_renew_status": "1"
    }],
    "latest_receipt": latest
  };

  if (hx.includes('hxpc')) {
    const xreceipt = {
      "expires_date_formatted": EXPIRATION_DATE,
      "expires_date": EXPIRES_DATE_MS,
      "expires_date_formatted_pst": EXPIRATION_DATE.replace("Etc/GMT", "America/Los_Angeles"),
      "product_id": id,
    };
    response.receipt = { ...response.receipt, ...xreceipt };
    response.latest_receipt_info = { ...response.receipt, ...xreceipt };
    response.status = 0;
    response.auto_renew_status = 1;
    response.auto_renew_product_id = id;
  }

  return response;
}

function main() {
  const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
  const originalResponse = JSON.parse($response.body);
  const bundleId = originalResponse.receipt.bundle_id || originalResponse.receipt.Bundle_Id;
  
  let processedResponse = null;

  for (const [appIdentifier, appInfo] of Object.entries(appList)) {
    if (new RegExp(`^${appIdentifier}`, 'i').test(ua) || new RegExp(`^${appIdentifier}`, 'i').test(bundleId)) {
      if (appInfo.method === 'v1') {
        processedResponse = processAppV1(appInfo, bundleId);
      } else if (appInfo.method === 'v2') {
        processedResponse = processAppV2(appInfo, bundleId);
      }
      console.log('恭喜您，已操作成功🎉🎉🎉\mikephieの分享频道: https://t.me/mikephie');
      break;
    }
  }

  if (!processedResponse) {
    const yearlyId = `${bundleId}.yearly`;
    processedResponse = processAppV1({ product_id: yearlyId }, bundleId);
    console.log('很遗憾未能识别出UA或bundle_id\n但已使用备用方案操作成功🎉🎉🎉\mikephieの分享频道: https://t.me/mikephie');
  }

  processedResponse = {
    ...originalResponse,
    ...processedResponse,
    "Telegram": "https://t.me/mikephie",
    "warning": "仅供学习，禁止转载或售卖"
  };

  $done({ body: JSON.stringify(processedResponse) });
}

main();