import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGamesSessionsListComponent } from './board-games-sessions-list.component';

describe('BoardGamesSessionsListComponent', () => {
  let component: BoardGamesSessionsListComponent;
  let fixture: ComponentFixture<BoardGamesSessionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardGamesSessionsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardGamesSessionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
