const NEOPAY_DOMAIN = "https://uat-api.neopay.vn/pg";

const NEOPAY_STATIC_POPUP =
  "https://raw.githubusercontent.com/neopayvn/neopay-pg-js-sdk/main/dist/neopay-popup.html";

const VIEW_TYPE = {
  POPUP: "POPUP",
  REDIRECT: "REDIRECT",
};

async function hashSHA256(text) {
  const utf8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, "0"))
    .join("");
  return hashHex.toUpperCase();
}

function convertUrlToObject(url) {
  try {
    let search = url.split("?")[1];
    return JSON.parse(
      '{"' + decodeURI(search.replace(/&/g, '","').replace(/=/g, '":"')) + '"}'
    );
  } catch (error) {
    return null;
  }
}

function convertObjectToUrl(obj) {
  try {
    return Object.keys(obj)
      .map((key) => `${key}=${obj[key]}`)
      .join("&");
  } catch (error) {
    return "";
  }
}

let neopaySDK = {
  callbacks: {
    onSuccess: (data) => {},
    onFailure: (data) => {},
    onClose: (data) => {},
  },
  configUI: {
    hiddenFooter: false,
    hiddenHeader: false,
    hiddenPaymentMethod: false,
    hiddenOrderInfo: false,
  },
  init: async (configUI, callbacks) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        $("body").append(this.responseText);
      }
    };
    xhttp.open("GET", NEOPAY_STATIC_POPUP, true);
    xhttp.send();
    console.log("init finished");
    neopaySDK.listenEvent();
    if (callbacks) {
      neopaySDK.callbacks = { ...neopaySDK.callbacks, ...callbacks };
    }
    if (configUI) {
      neopaySDK.configUI = {
        hiddenHeader: configUI.neo_HiddenHeader,
        hiddenFooter: configUI.neo_HiddenFooter,
        hiddenPaymentMethod: configUI.neo_HiddenPaymentMethod,
        hiddenOrderInfo: configUI.neo_HiddenOrderInfo,
      };
    }
    neopaySDK.checkUrlPayment();
  },
  checkUrlPayment: function () {
    //trong trang checkout: kiểm tra kết quả thanh toán
    const url = window.location.href;
    const response = convertUrlToObject(url);
    if (response) {
      if (Number(response?.neo_ResponseCode?.toString()) === 0) {
        neopaySDK.callbacks.onSuccess(response);
      } else {
        neopaySDK.callbacks.onFailure(response);
      }
    }
  },
  listenEvent: function () {
    $(document).on("click", "#neopay_button_close", function () {
      $("#neopay").attr("style", "display: none; ");
      neopaySDK.reload();
      neopaySDK.callbacks.onClose("close");
    });

    function receiveMessage(event) {
      const { type } = event.data;
      switch (type) {
        case "NEOPAY_GATEWAY_READY": {
          //gửi cấu hình sau khi nhận tín hiệu load xong
          document.getElementById("neopay_iframe").contentWindow.postMessage(
            {
              type: "NEOPAY_GATEWAY_CONFIG_UI",
              configUI: neopaySDK.configUI,
            },
            "*"
            // "http://localhost:3000/"
          );
          break;
        }
        case "CLOSE_NEOPAY_GATEWAY_POPUP": {
          //đóng popup và gửi kết quả thanh toán
          const { url } = event.data;
          neopaySDK.close();
          const response = convertUrlToObject(url);
          if (Number(response?.neo_ResponseCode?.toString()) === 0) {
            neopaySDK.callbacks.onSuccess(response);
          } else {
            neopaySDK.callbacks.onFailure(response);
          }
        }
        default:
          break;
      }
    }

    window.addEventListener("message", receiveMessage, false);
  },
  reload: function () {
    //reload iframe
    $("#neopay_iframe").removeAttr("src");
  },
  /**
   * Assign the project to an data.
   * @param {Object} data - Data of request payment.
   * @param {string} data.neo_MerchantCode - neo_MerchantCode.
   * @param {string} data.neo_PaymentMethod - neo_PaymentMethod.
   * @param {string} data.neo_Currency - neo_Currency.
   * @param {string} data.neo_Locale - neo_Locale.
   * @param {string} data.neo_Version - neo_Version.
   * @param {string} data.neo_Command - neo_Command.
   * @param {string} data.neo_Amount - neo_Amount.
   * @param {string} data.neo_MerchantTxnID - neo_MerchantTxnID.
   * @param {string} data.neo_OrderID - neo_OrderID.
   * @param {string} data.neo_OrderInfo - neo_OrderInfo.
   * @param {string} data.neo_Title - neo_Title.
   * @param {string} data.neo_ReturnURL - neo_ReturnURL.
   * @param {string} data.neo_AgainURL - neo_AgainURL.
   * @param {string} data.neo_ViewType - popup | redirect
   * @param {String} hashKey (hashKey is a String)
   */
  pay: function (config, hashKey) {
    try {
      const { neo_ViewType, ...rest } = config;
      let url = convertObjectToUrl(rest);
      const secureHashBefore =
        Object.keys(rest)
          .sort((a, b) => a.localeCompare(b))
          .map((field) => {
            if (field === "neo_PaymentMethod") {
              return (rest[field] || []).join(",");
            }
            return rest[field];
          })
          .join("") + hashKey;

      hashSHA256(secureHashBefore)
        .then((secureHashAfter) => {
          url = `${NEOPAY_DOMAIN}/api/v1/paygate/neopay?${url}&neo_SecureHash=${secureHashAfter}`;
          if (neo_ViewType === VIEW_TYPE.POPUP) {
            //test
            // url =
            //   "http://localhost:3000/pg/paygate/tgdd?billId=MjIwNjIyMTAwMjU0WVlIQ0NS";
            $("#neopay_iframe").attr("src", url);
            $("#neopay").attr("style", "display: block; ");
          } else {
            window.location.href = url;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  },
  close: function () {
    $("#neopay").attr("style", "display: none; ");
    neopaySDK.reload();
    neopaySDK.callbacks.onClose("close");
  },
};
