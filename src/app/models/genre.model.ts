export default class Genre {
  public translitname: string;
  public name: string;
  public bookcount: number;

  constructor(_translitname: string, _name: string, _bookcount: number) {
    this.translitname = _translitname;
    this.name = _name;
    this.bookcount = _bookcount;
  }
}
