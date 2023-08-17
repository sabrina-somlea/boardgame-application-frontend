export interface BoardGameApiModel{
  id?:String,
  name: String;
  description: String;
  year_published: number;
  minPlayers: number;
  maxPlayers: number;
  minPlayTime: number;
  maxPlayTime: number;
  imageUrl: String;

}
