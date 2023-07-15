export interface BoardGame{
  id?:String,
  name: String;
  description: String;
  year_published: number;
  min_players: number;
  max_players: number;
  min_playtime: number;
  max_playtime: number;
  username?: string

}
