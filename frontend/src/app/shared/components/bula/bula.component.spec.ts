import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulaComponent } from './bula.component';

describe('BulaComponent', () => {
  let component: BulaComponent;
  let fixture: ComponentFixture<BulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
