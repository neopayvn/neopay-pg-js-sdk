# Javascript SDK for NeoPay Payment Gateway

## Use

```html
<!-- example-payment.html -->
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
  </body>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script
    neopay-sdk
    type="text/javascript"
    src="https://cdn.jsdelivr.net/gh/neopayvn/neopay-pg-js-sdk/sdk/neopay-sdk.min.js"
  ></script>
  <script>
    const MERCHANT_CODE = "SDTEST"; // WARNING: replace your code on production
    const HASH_KEY = "4F99C21FE8A14FD198FA00D"; // WARNING: don't do this on production, your HASH_KEY need to be secure on server side
    $(document).ready(function () {
      const neo_PaymmentBaseUrl = "https://sandbox-api.neopay.vn/pg";
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
        neo_MerchantCode: MERCHANT_CODE,
        neo_PaymentMethod: ["WALLET", "ATM", "CC", "QR"],
        neo_Currency: "VND",
        neo_Locale: "vi",
        neo_Version: "1",
        neo_Command: "PAY",
        neo_Amount: Math.floor(Math.random() * 600000) + 100000,
        neo_MerchantTxnID: `T${`${Date.now()}`.slice(-8)}`,
        neo_OrderID: `DH${`${Date.now()}`.slice(-8)}`,
        neo_OrderInfo: `Thanh toán ĐH Test`,
        neo_Title: "Thanh toán",
        neo_ReturnURL: "https://your-website-domain/return", // replace your url
        neo_ViewType: "POPUP", //POPUP | REDIRECT
      };
      neopaySDK.pay(config, HASH_KEY);
    }

    function onPayWithRedirect() {
      const config = {
        neo_MerchantCode: MERCHANT_CODE,
        neo_PaymentMethod: ["WALLET", "ATM", "CC", "QR"],
        neo_Currency: "VND",
        neo_Locale: "vi",
        neo_Version: "1",
        neo_Command: "PAY",
        neo_Amount: Math.floor(Math.random() * 600000) + 100000,
        neo_MerchantTxnID: `T${`${Date.now()}`.slice(-8)}`,
        neo_OrderID: `DH${`${Date.now()}`.slice(-8)}`,
        neo_OrderInfo: `Thanh toán ĐH Test`,
        neo_Title: "Thanh toán",
        neo_ReturnURL: "https://your-website-domain/return",
        neo_ViewType: "REDIRECT", //POPUP | REDIRECT
      };
      neopaySDK.pay(config, HASH_KEY);
    }
  </script>
</html>
```

## ----------------------------------------------------------------

```html
<!-- example-result.html -->
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
      const neo_PaymmentBaseUrl = "https://sandbox-api.neopay.vn/pg";
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

### neopaySDK.init (neo_PaymmentBaseUrl, configUI, callbacks)

### neo_PaymmentBaseUrl

Thông tin đường dẫn thanh toán
Test môi trường Sandbox: https://sandbox-api.neopay.vn/pg

### configUI

| Tham số                 | Loại    | Giá trị mặc định | Mô tả                                    |
| ----------------------- | ------- | ---------------- | ---------------------------------------- |
| neo_HiddenHeader        | boolean | false            | Ẩn header khỏi giao diện                 |
| neo_HiddenFooter        | boolean | false            | Ẩn footer khỏi giao diện                 |
| neo_HiddenPaymentMethod | boolean | false            | Ẩn phương thức thanh toán khỏi giao diện |
| neo_HiddenOrderInfo     | boolean | false            | Ẩn thông tin đơn hàng khỏi giao diện     |

### neopaySDK.pay (config, hashKey)

| Tham số           | Loại   | Giá trị mặc định        | Bắt buộc | Mô tả                                                                                                                                           |
| ----------------- | ------ | ----------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| neo_MerchantCode  | string |                         | Có       | Mã đơn vị được NeoPAY cấp khi đăng ký kết nối                                                                                                   |
| neo_Currency      | string | VND                     | Có       | Loại tiền giao dịch, mặc định “VND”                                                                                                             |
| neo_Locale        | string | vi                      | Có       | Ngôn ngữ muốn hiển thị trên trang thanh toán, hỗ trợ: “vi”, “en”                                                                                |
| neo_Version       | string | 1                       | Có       | Phiên bản cổng thanh toán, mặc định “1”                                                                                                         |
| neo_Command       | string | PAY                     | Có       | Giá trị mặc định “PAY”                                                                                                                          |
| neo_Amount        | number |                         | Có       | Số tiền thanh toán                                                                                                                              |
| neo_MerchantTxnID | string |                         | Có       | Mã giao dịch duy nhất của đơn vị                                                                                                                |
| neo_OrderID       | string |                         | Có       | Mã đơn hàng cần thanh toán                                                                                                                      |
| neo_OrderInfo     | string |                         | Có       | Thông tin đơn hàng                                                                                                                              |
| neo_Title         | string |                         | Có       | Thông tin tiêu đề sẽ hiển thị trên trang thanh toán                                                                                             |
| neo_ReturnURL     | string |                         | Có       | URL website của đơn vị                                                                                                                          |
| neo_ViewType      | string | "POPUP" / "REDIRECT"    | Có       | Chọn mở cổng thanh toán dưới dạng popup hoặc redirect                                                                                           |
| neo_PaymentMethod | string | ["WALLET", "ATM", "CC", "QR"] | Không    | Cho phép chọn để hiển thị kênh thanh toán trực tiếp hoặc theo danh sách. Nếu không truyền trường này thì sẽ hiển thị tất cả các kênh được phép. |

### Mẫu request

```javascript
{
  neo_MerchantCode: "SDTEST",
  neo_PaymentMethod: ["WALLET", "ATM", "CC", "QR"],
  neo_Currency: "VND",
  neo_Locale: "vi",
  neo_Version: "1",
  neo_Command: "PAY",
  neo_Amount: Math.floor(Math.random() * 600000) + 100000,
  neo_MerchantTxnID: `T${`${Date.now()}`.slice(-8)}`,
  neo_OrderID: `DH${`${Date.now()}`.slice(-8)}`,
  neo_OrderInfo: `Thanh toán ĐH Test`,
  neo_Title: "Thanh toán",
  neo_ReturnURL: "https://your-website-domain/return",
  neo_ViewType: "POPUP",
}
```
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
  "neo_Amount": "112214",
  "neo_Command": "PAY",
  "neo_Currency": "VND",
  "neo_Locale": "vi",
  "neo_MerchantCode": "SDTEST",
  "neo_MerchantTxnID": "T23343243",
  "neo_OrderID": "DH28900084",
  "neo_OrderInfo": "Thanh toán ĐH Test",
  "neo_ResponseCode": "0",
  "neo_ResponseData": "",
  "neo_ResponseMsg": "Success",
  "neo_SecureHash": "80A669689BEE56D02211F8C762D828194C5B3AD121420433D280696B952F3A19",
  "neo_TransactionID": "5226",
  "neo_Version": "1"
}
```
