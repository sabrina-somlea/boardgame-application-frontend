import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGamesUserCollectionComponent } from './board-games-user-collection.component';

describe('BoardGamesUserCollectionComponent', () => {
  let component: BoardGamesUserCollectionComponent;
  let fixture: ComponentFixture<BoardGamesUserCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardGamesUserCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardGamesUserCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
