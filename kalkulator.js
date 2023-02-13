export default class Kalkulator {
  constructor(ciag = "", dane = []) {
    this.ciag = ciag;
    this.dane = dane;
  }
  drukuj() {
    console.log(`${this.ciag} ${this.dane}`);
  }
  dodaj(str) {
    // this.ciag = this.ciag.map((el) => str);
    this.ciag = str;
  }
  licz() {
    let wynik = 0;
    const reg1 = /[\+\-\:\*\/]/;
    const reg2 = /^\d+$/;
    let temp = [];
    let int = [];
    this.ciag.match(reg1) === null
      ? (temp = this.ciag)
      : (temp = this.ciag.match(reg1));
    const str = this.ciag.replace(temp, ",").split(",");
    function stringNaInt() {
      int = str.map((el) => parseFloat(el));
    }
    // console.log(int[0], this.ciag);
    stringNaInt();
    // debugger;
    if (temp === null) {
      wynik = 0;
    } else if (isNaN(int[0])) {
      wynik = parseFloat(this.ciag);
    } else if (temp[0] === "+") {
      //   console.log("dodaje?");
      wynik = int[0] + int[1];
    } else if (temp[0] === "-") {
      wynik = int[0] - int[1];
    } else if (temp[0] === "*") {
      wynik = int[0] * int[1];
    } else if (temp[0] === "/" || temp[0] === ":") {
      wynik = int[0] / int[1];
      wynik = Math.round((wynik + Number.EPSILON) * 100) / 100;
      wynik === Infinity ? (wynik = "Nie mozesz dzielic przez 0") : wynik;
    }
    // console.log(typeof wynik);
    if (typeof wynik === "number") {
      this.dane.push(wynik);
    }
    return wynik;
  }
}
