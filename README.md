# Javascript SDK for NeoPay Payment Gateway

## Use

```html
<!-- example.html -->
<!DOCTYPE html>
<html lang="vi-VN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>NEOPAY SDK Example</title>
  </head>

  <body>
    <button onclick="onPayWithPopup()">Thanh toán (Popup)</button>
    <br />
    <br />
    <button onclick="onPayWithRedirect()">Thanh toán (Redirect)</button>
    <br />
    <br />
    <button onclick="onPayWithDupliceOrderId()">
      Thanh toán (Mã đơn hàng bị trùng)
    </button>
  </body>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script
    neopay-sdk
    type="text/javascript"
    src="https://cdn.jsdelivr.net/gh/neopayvn/neopay-pg-js-sdk/sdk/neopay-sdk.min.js"
  ></script>
  <script>
    $(document).ready(function () {
      const neo_PaymmentBaseUrl = "https://uat-api.neopay.vn/pg";
      const configUI = {
        neo_HiddenHeader: false,
        neo_HiddenFooter: true,
        neo_HiddenPaymentMethod: false,
        neo_HiddenOrderInfo: false,
      };
      const callbacks = {
        onSuccess: (data) => {
          console.log("success", data);
        },
        onFailure: (data) => {
          console.log("failure:", data);
        },
        onClose: (data) => {
          console.log(data);
        },
      };
      neopaySDK.init(neo_PaymmentBaseUrl, configUI, callbacks);
    });
    function onPayWithPopup() {
      const config = {
        neo_MerchantCode: "HUYEN1",
        neo_PaymentMethod: ["WALLET", "ATM", "CC"],
        neo_Currency: "VND",
        neo_Locale: "vi",
        neo_Version: "1",
        neo_Command: "PAY",
        neo_Amount: Math.floor(Math.random() * 600000) + 100000,
        neo_MerchantTxnID: "T23343243",
        neo_OrderID: `DH${`${Date.now()}`.slice(-8)}`,
        neo_OrderInfo: `Thanh toán ĐH Test`,
        neo_Title: "Thanh toán",
        neo_ReturnURL: "https://www.google.com/",
        neo_AgainURL: "https://www.google.com/",
        neo_ViewType: "POPUP", //POPUP | REDIRECT
      };
      const hashKey = "123456";
      neopaySDK.pay(config, hashKey);
    }

    function onPayWithRedirect() {
      const config = {
        neo_MerchantCode: "HUYEN1",
        neo_PaymentMethod: ["WALLET", "ATM", "CC"],
        neo_Currency: "VND",
        neo_Locale: "vi",
        neo_Version: "1",
        neo_Command: "PAY",
        neo_Amount: Math.floor(Math.random() * 600000) + 100000,
        neo_MerchantTxnID: "T23343243",
        neo_OrderID: `DH${`${Date.now()}`.slice(-8)}`,
        neo_OrderInfo: `Thanh toán ĐH Test`,
        neo_Title: "Thanh toán",
        neo_ReturnURL: "https://www.google.com/",
        neo_AgainURL: "https://www.google.com/",
        neo_ViewType: "REDIRECT", //POPUP | REDIRECT
      };
      const hashKey = "123456";
      neopaySDK.pay(config, hashKey);
    }

    function onPayWithDupliceOrderId() {
      const config = {
        neo_MerchantCode: "HUYEN1",
        neo_PaymentMethod: ["WALLET", "ATM", "CC"],
        neo_Currency: "VND",
        neo_Locale: "vi",
        neo_Version: "1",
        neo_Command: "PAY",
        neo_Amount: Math.floor(Math.random() * 600000) + 100000,
        neo_MerchantTxnID: "T23343243",
        neo_OrderID: `DH001`,
        neo_OrderInfo: `Thanh toán ĐH DH001`,
        neo_Title: "Thanh toán",
        neo_ReturnURL: "https://www.google.com/",
        neo_AgainURL: "https://www.google.com/",
        neo_ViewType: "REDIRECT", //POPUP | REDIRECT
      };
      const hashKey = "123456";
      neopaySDK.pay(config, hashKey);
    }
  </script>
</html>
```

## ----------------------------------------------------------------

```html
<!-- checkout.html -->
<!DOCTYPE html>
<html lang="vi-VN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>NEOPAY SDK Example Checkout</title>
  </head>

  <body>
    <span id="neopay-checkout">Checkout</span>
  </body>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script
    neopay-sdk
    type="text/javascript"
    src="https://cdn.jsdelivr.net/gh/neopayvn/neopay-pg-js-sdk/sdk/neopay-sdk.min.js"
  ></script>
  <script>
    $(document).ready(function () {
      const neo_PaymmentBaseUrl = "https://uat-api.neopay.vn/pg";
      const configUI = {
        neo_HiddenHeader: false,
        neo_HiddenFooter: true,
      };
      const callbacks = {
        onSuccess: (data) => {
          console.log("success", data);
        },
        onFailure: (data) => {
          console.log("failure:", data);
        },
        onClose: (data) => {
          console.log(data);
        },
      };
      neopaySDK.init(neo_PaymmentBaseUrl, configUI, callbacks);
    });
  </script>
</html>
```

## Methods

| Phương thức | Mô tả                                              |
| ----------- | -------------------------------------------------- |
| init        | Khởi tạo các cấu hình cần thiết cho SDK và load UI |
| pay         | Thanh toán                                         |
| close       | Đóng popup thanh toán                              |

### neopaySDK.init (neo_Domain, configUI, callbacks)

### neo_PaymmentBaseUrl

Thông tin đường dẫn thanh toán
Test môi trường UAT: https://uat-api.neopay.vn/pg

### configUI

| Tham số                 | Loại    | Giá trị mặc định | Mô tả                                    |
| ----------------------- | ------- | ---------------- | ---------------------------------------- |
| neo_HiddenHeader        | boolean | false            | Ẩn header khỏi giao diện                 |
| neo_HiddenFooter        | boolean | false            | Ẩn footer khỏi giao diện                 |
| neo_HiddenPaymentMethod | boolean | false            | Ẩn phương thức thanh toán khỏi giao diện |
| neo_HiddenOrderInfo     | boolean | false            | Ẩn thông tin đơn hàng khỏi giao diện     |

### callback

| Sự kiện   | Mô tả                                    |
| --------- | ---------------------------------------- |
| onSuccess | Sự kiện xảy ra khi thanh toán thành công |
| onFailure | Sự kiện xảy ra khi thanh toán thất bại   |
| onClose   | Sự kiện xảy ra khi đóng popup            |

### Dữ liệu callback từ sự kiện onSuccess và onFailure

| Tham số           | Loại   | Mô tả                                                                                                     |
| ----------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| neo_MerchantCode  | string | Mã đơn vị được NeoPAY cấp khi đăng ký kết nối                                                             |
| neo_Currency      | string | Loại tiền giao dịch, mặc định “VND”                                                                       |
| neo_Locale        | string | Ngôn ngữ muốn hiển thị trên trang thanh toán, hỗ trợ: “vi”, “en”                                          |
| neo_Version       | string | Phiên bản cổng thanh toán, mặc định “1”                                                                   |
| neo_Command       | string | Giá trị mặc định “PAY”                                                                                    |
| neo_Amount        | string | Số tiền thanh toán                                                                                        |
| neo_MerchantTxnID | string | Mã giao dịch duy nhất của đơn vị                                                                          |
| neo_OrderID       | string | Mã đơn hàng cần thanh toán                                                                                |
| neo_OrderInfo     | string | Thông tin đơn hàng                                                                                        |
| neo_TransactionID | string | Mã giao dịch duy nhất sinh ra bởi hệ thống NeoPAY, có tác dụng đối soát, tra soát với đơn vị              |
| neo_ResponseCode  | number | Mã lỗi trả về từ NeoPAY chỉ ra kết quả của giao dịch                                                      |
| neo_ResponseMsg   | string | Mô tả lỗi                                                                                                 |
| neo_CustomerID    | string | Mã khách hàng trên hệ thống đơn vị                                                                        |
| neo_ResponseData  | string | Thông tin thêm về dữ liệu thanh toán của khách hàng                                                       |
| neo_SecureHash    | string | SHA256 giá trị các tham số trên theo thứ tự Alphabet + Secret Key của đơn vị(được NeoPAY cấp khi kết nối) |

### Mẫu response

```Javascript
{
"neo_MerchantCode"="dmx",
"neo_Currency"="VND",
"neo_Locale"="vi",
"neo_Version"="1",
"neo_Command"="PAY",
"neo_Amount"=99999,
"neo_MerchantTxnID"="T21895327",
"neo_OrderID"="DH21895327",
"neo_OrderInfo"="Thanh toán ĐH DH21895327",
"neo_TransactionID"=undefined,
"neo_ResponseCode"=18,
"neo_ResponseMsg"="Canceled",
"neo_ResponseData"="",
"neo_SecureHash":"92D148469F2BD499A7BEB169B7313EECCAAAE9C7B2E01424556AEDFF4083639A"
}
```

### neopaySDK.pay (config, hashKey)

| Tham số               | Loại   | Giá trị mặc định        | Bắt buộc | Mô tả                                                                                                                                           |
| --------------------- | ------ | ----------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| neo_MerchantCode      | string |                         | Có       | Mã đơn vị được NeoPAY cấp khi đăng ký kết nối                                                                                                   |
| neo_Currency          | string | VND                     | Có       | Loại tiền giao dịch, mặc định “VND”                                                                                                             |
| neo_Locale            | string | vi                      | Có       | Ngôn ngữ muốn hiển thị trên trang thanh toán, hỗ trợ: “vi”, “en”                                                                                |
| neo_Version           | string | 1                       | Có       | Phiên bản cổng thanh toán, mặc định “1”                                                                                                         |
| neo_Command           | string | PAY                     | Có       | Giá trị mặc định “PAY”                                                                                                                          |
| neo_Amount            | number |                         | Có       | Số tiền thanh toán                                                                                                                              |
| neo_MerchantTxnID     | string |                         | Có       | Mã giao dịch duy nhất của đơn vị                                                                                                                |
| neo_OrderID           | string |                         | Có       | Mã đơn hàng cần thanh toán                                                                                                                      |
| neo_OrderInfo         | string |                         | Có       | Thông tin đơn hàng                                                                                                                              |
| neo_Title             | string |                         | Có       | Thông tin tiêu đề sẽ hiển thị trên trang thanh toán                                                                                             |
| neo_ReturnURL         | string |                         | Có       | URL website của đơn vị                                                                                                                          |
| neo_AgainURL          | string |                         | Có       | URL trang thanh toán của đơn vị trước khi chuyển sang NeoPAY                                                                                    |
| neo_ViewType          | string | "POPUP" / "REDIRECT"    | Có       | Chọn mở cổng thanh toán dưới dạng popup hoặc redirect                                                                                           |
| neo_PaymentMethod     | string | ["WALLET", "ATM", "CC"] | Không    | Cho phép chọn để hiển thị kênh thanh toán trực tiếp hoặc theo danh sách. Nếu không truyền trường này thì sẽ hiển thị tất cả các kênh được phép. |
| neo_CustomerPhone     | string |                         | Không    | Số điện thoại khách hàng                                                                                                                        |
| neo_CustomerEmail     | string |                         | Không    | Email khách hàng                                                                                                                                |
| neo_CustomerID        | string |                         | Không    | Mã khách hàng trên hệ thống đơn vị                                                                                                              |
| neo_CustomerIpAddress | string |                         | Không    | Địa chỉ IP của khách hàng                                                                                                                       |

### Mẫu request

```javascript
{
"neo_MerchantCode"="dmx",
"neo_PaymentMethod"="WALLET",
"neo_Currency"="VND",
"neo_Locale"="vi",
"neo_Version"="1",
"neo_Command"="PAY",
"neo_Amount"=99999,
"neo_MerchantTxnID"="T21895327",
"neo_OrderID"="DH21895327",
"neo_OrderInfo"="Thanh toán ĐH DH21895327",
"neo_TransactionID"=undefined,
"neo_ResponseCode"=undefined,
"neo_ResponseMsg"=undefined,
"neo_ResponseData"="",
"neo_napasToken"="",
"neo_SecureHash"="70BB73C17138C207EC4AE08E07DF2B0EB5901C1C5BC0CAC5AB1059A7AC4D8CE4"
}
```
