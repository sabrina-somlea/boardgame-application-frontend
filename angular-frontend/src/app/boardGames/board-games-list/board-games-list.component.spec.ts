import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGamesListComponent } from './board-games-list.component';

describe('BoardGamesListComponent', () => {
  let component: BoardGamesListComponent;
  let fixture: ComponentFixture<BoardGamesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardGamesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardGamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
