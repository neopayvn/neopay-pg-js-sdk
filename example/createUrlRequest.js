const crypto = require('crypto');

const API_URL = 'https://uat-api.neopay.vn/pg/api/v1/paygate/neopay'

const hashSHA256 = (text) => {
    const hashed = crypto.createHash('sha256');
    const res = hashed.update(text).digest('hex');
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
    const url = `${API_URL}?${query}&neo_SecureHash=${neo_SecureHash}`;
    return url;
}

const runTest = () => {
    const obj = {
        "neo_MerchantCode": "SDTEST",
        "neo_PaymentMethod": "WALLET,ATM,CC,QR",
        "neo_Currency": "VND",
        "neo_Locale": "vi",
        "neo_Version": "1",
        "neo_Command": "PAY",
        "neo_Amount": 10000,
        "neo_MerchantTxnID": `${`${Date.now()}`.slice(-8)}`, // unique per request
        "neo_OrderID": "DH21895330",
        "neo_OrderInfo": "Thanh toán ĐH Test",
        "neo_Title": "Thanh toán",
        "neo_ReturnURL": "https://your-website-domain/return",
    }
    const hashKey = "4F99C21FE8A14FD198FA00D"
    const url = generatorUrlRequest(obj, hashKey);
    console.log(url)
}

runTest();
