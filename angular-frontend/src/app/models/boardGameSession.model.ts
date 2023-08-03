import {BoardGame} from "./boardGames.model";
import {User} from "./users.model";

export interface BoardGameSessionModel {
  id?: String;
  sessionDate: string;
  boardGame: BoardGame;
  winner: User;
 players: User[];

}
