export class CountryList {
  constructor ({
    data
  }) {
    this.data = data
  }

  init () {
    this.data = generateData(this.data)
  }
}
