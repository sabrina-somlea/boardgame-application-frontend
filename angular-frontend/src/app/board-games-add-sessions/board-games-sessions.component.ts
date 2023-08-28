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
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-board-games-sessions',
  templateUrl: './board-games-sessions.component.html',
  styleUrls: ['./board-games-sessions.component.css']
})
export class BoardGamesSessionsComponent {
  maxDate:any;
  minDate:any;
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
  playerAlreadySelected = false;
  constructor(private fb: FormBuilder,private userFriendsService: UserFriendsService, private userService: UsersService, private tokenStorageService: TokenStorageService, private boardGamesSessionService: BoardGamesSessionsService, private router: Router, private boardGameService: BoardGamesService, private snackBar: MatSnackBar) {
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
    this.futureDateDisable()

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
      !!this.newSession.winner.id &&
      this.newSession.players.length > 0 &&
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
        alert('Session added successfully!');
       // this.snackBar.open('New session added successfully!', 'Close', {
       //    duration: 3000,
       //    verticalPosition: 'top',
       //  });
       //  setTimeout(() => {
          this.router.navigate(['/boardGamesSessionList']);
       //  }, 1000);
      });
  }

  cancel(): void {
    this.router.navigate(['/boardGamesSessionList']);
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
      this.playerAlreadySelected = false;
    }
    else{
      console.log('player already selected')
      this.playerAlreadySelected = true;
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

  futureDateDisable(){
    let date:any = new Date();
    let todayDate:any= date.getDate();
    let month:any=date.getMonth() + 1;
    let year:any =date.getFullYear();

    if(todayDate < 10){
      todayDate = "0" + todayDate;
    }
    if(month < 10){
      month = "0" + month;
    }
    this.maxDate = year + "-" + month + "-" + todayDate;
    console.log(this.maxDate);
  }
}
