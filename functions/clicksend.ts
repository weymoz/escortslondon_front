import CryptoJS from "crypto-js";

const randomCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const checkSmsCode = (code: string, hashCode: string) => {
  const bytes = CryptoJS.AES.decrypt(
    hashCode,
    process.env.NEXT_PUBLIC_CLICKSEND_HASH_KEY
  );
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText === code;
};
