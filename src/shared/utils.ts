import { FunctionArgs } from '@vueuse/core';
import dayjs from 'dayjs'
import * as CryptoJS from 'crypto-js';

export const downloadBlobFile = (
  data: Blob,
  fileName: string,
  suffixName = "xlsx",
  idDate = true
) => {
  let date = dayjs().format('YYYYMMDDHHmm');
  let url = window.URL.createObjectURL(data);
  let a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}${idDate ? "-" + date : ""}.${suffixName}`;
  a.click();
  URL.revokeObjectURL(url);
};

//防止代码级别连续触发
export const watchDebouncedKeys = (sources: any, cb: FunctionArgs<any[], void>, keys: string[], options: any = {}) => {
  let debouncedCBLong = debounce(cb, options.ms || 500)
  let debouncedCBShort = debounce(cb, options.sms || 0)
  watch(
    sources,
    (n, o) => {
      let needDebounce = keys.some(k => n[k] !== o[k])
      if (needDebounce) {
        debouncedCBShort.cancel()
        debouncedCBLong(n, o)
      } else {
        debouncedCBLong.cancel()
        debouncedCBShort(n, o)
      }
    }
  )
};

export const debounce = (fn: any, delay: number = 500): any => {

  // 定时器，用来 setTimeout
  let timer: any

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  function debounced(this: any) {

    // 保存函数调用时的上下文和参数，传递给 fn
    let context = this
    let args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
  debounced.cancel = function () {
    clearTimeout(timer)
  }
  debounced.immediate = function () {
    debounced.cancel()
    let context = this
    let args = arguments
    fn.apply(context, args)
  }
  return debounced
}

const key = CryptoJS.enc.Utf8.parse("dlVWXnPTSQzd74OY"); //十六位十六进制数作为密钥
// const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412"); //十六位十六进制数作为密钥偏移量 VVeMG0pclKcF2F4BSt5B6Q==
/*加密函数*/
export const encrypt = (word: string) => {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};
/*解密函数*/
export const decrypt = (word: string) => {
  let encryptedHexStr = CryptoJS.enc.Base64.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};