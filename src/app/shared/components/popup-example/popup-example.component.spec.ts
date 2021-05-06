import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupExampleComponent } from './popup-example.component';

describe('PopupExampleComponent', () => {
  let component: PopupExampleComponent;
  let fixture: ComponentFixture<PopupExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
