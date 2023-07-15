import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGamesSearchComponent } from './board-games-search.component';

describe('BoardGamesSearchComponent', () => {
  let component: BoardGamesSearchComponent;
  let fixture: ComponentFixture<BoardGamesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardGamesSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardGamesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
