import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGamesSessionsComponent } from './board-games-sessions.component';

describe('BoardGamesSessionsComponent', () => {
  let component: BoardGamesSessionsComponent;
  let fixture: ComponentFixture<BoardGamesSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardGamesSessionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardGamesSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
