export default  class NumUtils {
  static getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}