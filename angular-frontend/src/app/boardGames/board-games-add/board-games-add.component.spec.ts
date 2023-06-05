import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGamesAddComponent } from './board-games-add.component';

describe('BoardGamesAddComponent', () => {
  let component: BoardGamesAddComponent;
  let fixture: ComponentFixture<BoardGamesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardGamesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardGamesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
