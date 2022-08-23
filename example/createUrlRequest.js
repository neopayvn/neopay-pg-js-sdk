const crypto = require('crypto');

const API_URL = 'https://uat-api.neopay.vn/pg/api/v1/'

const hashSHA256 = (text) => {
    const md5sum = crypto.createHash('sha256');
    const res = md5sum.update(text).digest('hex');
    return res;
}

const generatorSecureHash = (obj, hashKey) => {
    const rawData = Object.keys(obj)
        .sort((a, b) => a.localeCompare(b))
        .map((field) => {
            return obj[field];
        })
        .join("") + hashKey;
    return hashSHA256(rawData);
}

const convertObjectToQuery = (obj) => {
    try {
        return Object.keys(obj)
            .map((key) => `${key}=${obj[key]}`)
            .join("&");
    } catch (error) {
        return "";
    }
}

/** Tạo url request */
const generatorUrlRequest = (obj, secureHash) => {
    let query = convertObjectToQuery(obj);
    const neo_SecureHash = generatorSecureHash(obj, secureHash)
    const url = `${API_URL}paygate/neopay?${query}&neo_SecureHash=${neo_SecureHash}`;
    return url;
}

const runTest = () => {
    const obj = {
        "neo_MerchantCode": "HUYEN1",
        "neo_PaymentMethod": "WALLET, ATM, CC, QR",
        "neo_Currency": "VND",
        "neo_Locale": "vi",
        "neo_Version": "1",
        "neo_Command": "PAY",
        "neo_Amount": 10000,
        "neo_MerchantTxnID": "T21895330",
        "neo_OrderID": `DH${`${Date.now()}`.slice(-8)}`,
        "neo_OrderInfo": "Thanh toán ĐH Test",
        "neo_Title": "Thanh toán",
        "neo_ReturnURL": "https://uat-api.neopay.vn/pg/paygate/tryitnow/",
    }
    const hashKey = "123456"
    const url = generatorUrlRequest(obj, hashKey);
    console.log(url)
}

runTest();