import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCurateDisplayComponent } from './resource-curate-display.component';

describe('ResourceCurateDisplayComponent', () => {
  let component: ResourceCurateDisplayComponent;
  let fixture: ComponentFixture<ResourceCurateDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceCurateDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceCurateDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
