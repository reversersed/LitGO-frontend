import type Genre from './genre.model';

export default class Category {
  public translitName: string;
  public name: string;
  public genres: Genre[];

  constructor(_translitName: string, _name: string, _genres: Genre[]) {
    this.translitName = _translitName;
    this.name = _name;
    this.genres = _genres;
  }
}
