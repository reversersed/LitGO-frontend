export default class Author {
  public id: string;
  public name: string;
  public translitname: string;
  public profilepicture: string;
  public about: string;
  public rating: number;

  constructor(
    _id: string,
    _name: string,
    _translitname: string,
    _profilepicture: string,
    _about: string,
    _rating: number
  ) {
    this.id = _id;
    this.name = _name;
    this.translitname = _translitname;
    this.profilepicture = _profilepicture;
    this.about = _about;
    this.rating = _rating;
  }
}
