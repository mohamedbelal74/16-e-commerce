import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackLayoutComponent } from './black-layout.component';

describe('BlackLayoutComponent', () => {
  let component: BlackLayoutComponent;
  let fixture: ComponentFixture<BlackLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlackLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
