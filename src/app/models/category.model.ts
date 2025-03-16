import type Genre from './genre.model';

export default class Category {
  public translitname: string;
  public name: string;
  public genres?: Genre[];

  constructor(_translitname: string, _name: string, _genres: Genre[]) {
    this.translitname = _translitname;
    this.name = _name;
    this.genres = _genres;
  }
}
