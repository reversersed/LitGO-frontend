export default class Genre {
  public translitname: string;
  public name: string;
  public bookCount: number;

  constructor(_translitname: string, _name: string, _bookCount: number) {
    this.translitname = _translitname;
    this.name = _name;
    this.bookCount = _bookCount;
  }
}
