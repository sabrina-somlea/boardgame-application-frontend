import { Component } from '@angular/core';
import {BoardGameSessionModel} from "../models/boardGameSession.model";
import {User} from "../models/users.model";
import {UserFriendsService} from "../services/user-friends.service";
import {UsersService} from "../services/users.service";
import {TokenStorageService} from "../services/token-storage.service";
import {BoardGame} from "../models/boardGames.model";
import {Router} from "@angular/router";
import {BoardGamesSessionsService} from "../services/boardGamesSessions.service";
import {BoardGamesService} from "../services/boardGames.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-board-games-sessions',
  templateUrl: './board-games-sessions.component.html',
  styleUrls: ['./board-games-sessions.component.css']
})
export class BoardGamesSessionsComponent {

  userForm: FormGroup;
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
  currentUser: any;
  isFormValid = false;
  constructor(private fb: FormBuilder,private userFriendsService: UserFriendsService, private userService: UsersService, private tokenStorageService: TokenStorageService, private boardGamesSessionService: BoardGamesSessionsService, private router: Router, private boardGameService: BoardGamesService) {
    this.userForm = this.fb.group({
      sessionDate: ['', Validators.required],
      boardGameName: ['', Validators.required],
      playerSelect: ['', Validators.required],
      winner:['', Validators.required]
    });

  }



  ngOnInit(): void {
    const username = this.tokenStorageService.getUser()
    this.viewUserDetails()
    this.getFriendsList(username);
    console.log(this.friendsList);
    this.loadUserCollection(username)
    console.log(this.newSession.sessionDate)

  }

  getFriendsList(username: string) {
    this.userFriendsService.viewUserFriends(this.tokenStorageService.getUser())
      .subscribe((data: User[]) => {
        this.friendsList = data;
        this.friendsList.push(this.currentUser)
        console.log(this.friendsList);
      });
  }

  loadUserCollection(username: string): void {
    this.boardGameService.viewUserCollection(this.tokenStorageService.getUser())
      .subscribe((data: BoardGame[]) => {
        this.boardGames = data
      });
  }

  onSubmit() {
    console.log(this.newSession);
  }

  filteredGames: BoardGame[] = [];
  selectedPlayers: User[] = [];

  areAllFieldsCompleted(): boolean {
    console.log('boardGame:', this.newSession.boardGame);
    console.log('winner:', this.newSession.winner);
    console.log('players:', this.newSession.players);
    console.log('sessionDate:', this.newSession.sessionDate);

    const isCompleted = !!this.newSession.boardGame &&
      !!this.newSession.winner &&
      !!this.newSession.players &&
      !!this.newSession.sessionDate;

    console.log('isCompleted:', isCompleted);
    console.log(this.newSession)

    return isCompleted;
  }
  addBoardGameSession() {
    console.log(this.newSession)
    this.boardGamesSessionService
      .addBoardGameSession(this.newSession)
      .subscribe((data: BoardGameSessionModel) => {
        alert("New session added successfully!");
        this.router.navigate(['/boardgames']);
      })
  }

  cancel(): void {
    this.router.navigate(['/boardgames']);
  }



  addPlayerToSession() {

    let newPlayer: User;
    newPlayer = {
      id: '',
      firstName: '',
      lastName: '',
      birthday: '',
      email: '',
      username: '',
      password: '',
    };


    const newPlayerCopy = JSON.parse(JSON.stringify(newPlayer)); // Clonare obiect
    this.newSession.players.push(newPlayerCopy);
    console.log('se face push ' + JSON.stringify(this.newSession.players));
  }

  removePlayerFromSession(index: number) {
    this.newSession.players.splice(index, 1);
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
    // @ts-ignore
    this.newSession.boardGame = null;
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

      this.selectedBoardGame = null;
    this.showDropdown = false;
    this.showDropdownGames = false;
    this.showGameDeleteButton=true;
    }
  viewUserDetails(): void {
    this.userService.getUserInfo().subscribe(
      (user: User) => {
        this.currentUser = user;
        console.log(this.currentUser)
      },
      (error: any) => {
        console.error('Could not get user info', error);
      })
  }
}
