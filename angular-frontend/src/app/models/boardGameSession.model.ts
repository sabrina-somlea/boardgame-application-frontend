import {BoardGame} from "./boardGames.model";
import {User} from "./users.model";

export interface BoardGameSessionModel {
  id?: String;
  sessionDate: Date;
  boardGame: BoardGame;
  winner: User;
 players: Set<User>;

}
