import {Component, Pipe} from '@angular/core';
import {UserFriendsService} from "../services/user-friends.service";
import {UsersService} from "../services/users.service";
import {TokenStorageService} from "../services/token-storage.service";
import {BoardGamesSessionsService} from "../services/boardGamesSessions.service";
import {Router} from "@angular/router";
import {BoardGamesService} from "../services/boardGames.service";
import {User} from "../models/users.model";
import {BoardGameSessionModel} from "../models/boardGameSession.model";
import {Moment} from 'moment/moment';
import * as moment from "moment";
import {BoardGame} from "../models/boardGames.model";



@Component({
  selector: 'app-board-games-sessions-list',
  templateUrl: './board-games-sessions-list.component.html',
  styleUrls: ['./board-games-sessions-list.component.css']
})
export class BoardGamesSessionsListComponent {
  boardGameSessionsList: BoardGameSessionModel[] = [];
  newSession: BoardGameSessionModel = {
    sessionDate: '',
    boardGame: {
      id: '',
      name: '',
      description: '',
      year_published: 0,
      min_players: 0,
      max_players: 0,
      min_playtime: 0,
      max_playtime: 0
    },
    winner: {
      id: '',
      firstName: '',
      lastName: '',
      birthday: '',
      email: '',
      username: '',
      password: '',
    },
    players: [],
  };

  editSession: BoardGameSessionModel = {
    sessionDate: '',
    boardGame: {
      id: '',
      name: '',
      description: '',
      year_published: 0,
      min_players: 0,
      max_players: 0,
      min_playtime: 0,
      max_playtime: 0
    },
    winner: {
      id: '',
      firstName: '',
      lastName: '',
      birthday: '',
      email: '',
      username: '',
      password: '',
    },
    players: [],
  };
  updateBoardGameSession: BoardGameSessionModel | null = null;
  markedForUpdate: BoardGameSessionModel | undefined;
  selectedSessionId:String = '';
  friendsList: User[] = [];
  boardGamesInitial: BoardGame[] = [];
  boardGames: BoardGame[] = [];
  filteredFriends: User[] = [];
  newPlayerName: string = '';
  playerName: string = '';
  filteredPlayers: User[] = [];
  selectedPlayer: User | null = null;
  selectedBoardGame: BoardGame | null = null;
  showDropdown: boolean = false;
  showDropdownGames: boolean = false;
  showGameDeleteButton: boolean = false;
  filteredGames: BoardGame[] = [];
  selectedPlayers: User[] = [];
  constructor(private userFriendsService: UserFriendsService, private userService: UsersService, private tokenStorageService: TokenStorageService, private boardGamesSessionService: BoardGamesSessionsService, private router: Router, private boardGameService: BoardGamesService) {
  }

  ngOnInit(): void {
    const username = this.tokenStorageService.getUser()
    this.getBoardGamesSessionsList(username);

    console.log(this.boardGameSessionsList);
    this.getFriendsList(username);
    this.loadUserCollection(username)
  }

  getBoardGamesSessionsList(username: string) {
    this.boardGamesSessionService.getBoardGamesSessionsByUsername(this.tokenStorageService.getUser())
      .subscribe((data: BoardGameSessionModel[]) => {
        this.boardGameSessionsList = data;
        console.log(this.boardGameSessionsList);
        this.boardGameSessionsList.forEach(session => {
          const date = moment(session.sessionDate).format('YYYY-MM-DD');
          session.sessionDate = date;
          console.log(session.sessionDate)
        })
      });
  }

  startUpdate(boardGameSession: BoardGameSessionModel): void {
    this.markedForUpdate = boardGameSession;
    this.newSession = { ...boardGameSession };
    console.log('edit session', this.markedForUpdate)

  }

  confirmUpdate():void{
    if (this.markedForUpdate) {
      console.log('noile detalii' +this.markedForUpdate)
      this.boardGamesSessionService
        .updateBoardGameSession(this.newSession)
        .subscribe((data: BoardGameSessionModel) => {
          alert('Session updated successfully!');
          console.log(this.updateBoardGameSession)
          this.markedForUpdate = undefined;
          const username = this.tokenStorageService.getUser()
          this.getBoardGamesSessionsList(username);
        });
    }
  }
  cancelUpdate(): void {
    this.markedForUpdate = undefined;
  }

  getFriendsList(username: string) {
    this.userFriendsService.viewUserFriends(this.tokenStorageService.getUser())
      .subscribe((data: User[]) => {
        this.friendsList = data;
        console.log(this.friendsList);
      });
  }

  loadUserCollection(username: string): void {
    this.boardGameService.viewUserCollection(this.tokenStorageService.getUser())
      .subscribe((data: BoardGame[]) => {
        this.boardGames = data
      });
  }

  removePlayerFromSession(index: number) {
    this.newSession.players.splice(index, 1);
    console.log('player deleted' +
      this.newSession.players)
  }

  handleFilterPlayers(event: any) {
    const searchQuery = event.target.value.toLowerCase();
    //de implementat detaliile user
    // this.friendsList.push(this.tokenStorageService.getUser())
    console.log(this.friendsList)
    this.filteredPlayers = this.friendsList.filter(
      (player) =>
        player.firstName.toLowerCase().includes(searchQuery) ||
        player.lastName.toLowerCase().includes(searchQuery) ||
        player.username.toLowerCase().includes(searchQuery)
    );
    this.showDropdown = true;
  }

  handlePlayerSelect(player: User) {
    this.selectedPlayer = player;
  }

  handleAddPlayer(player: User) {
    this.selectedPlayer = player;
    if (!this.newSession.players.includes(player)) {
      this.newSession.players.push(this.selectedPlayer)
      console.log('player selecteeed:', this.selectedPlayer);

      console.log(this.newSession.players)
      this.selectedPlayer = null;
      this.showDropdown = false;
      console.log(this.newSession.players)
    }
    else{
      console.log('player already selected')
    }
  }

  handleRemovePlayer() {
    this.selectedPlayer = null;
  }

  handleBoardGameSelect(boardGame: BoardGame) {
    this.selectedBoardGame = boardGame;
  }

  handleRemoveBoardGame() {
    console.log(this.newSession);
    // @ts-ignore
    this.newSession.boardGame.name = null;
    console.log(this.newSession);
  }
  handleFilterBoardGames(event: any) {
    const searchQuery = event.target.value.toLowerCase();
    this.filteredGames = this.boardGames.filter(
      (boardGame) =>
        boardGame.name.toLowerCase().includes(searchQuery)
    );
    this.showDropdownGames = true;
  }

  handleAddBoardGame(boardGame: BoardGame) {
    this.selectedBoardGame = boardGame;
    this.newSession.boardGame = this.selectedBoardGame
    console.log('game selected:', this.newSession.boardGame);

    // this.selectedBoardGame = null;
    this.showDropdown = false;
    this.showDropdownGames = false;
    this.showGameDeleteButton=true;
  }
  }

