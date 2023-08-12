class Utils {
  isEmptyObj(obj: object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}

const utils = new Utils();
export default utils;
