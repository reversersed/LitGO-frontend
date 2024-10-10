export default class Genre {
  public translitName: string;
  public name: string;
  public bookCount: number;

  constructor(_translitName: string, _name: string, _bookCount: number) {
    this.translitName = _translitName;
    this.name = _name;
    this.bookCount = _bookCount;
  }
}
