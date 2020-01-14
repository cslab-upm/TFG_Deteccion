import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoTutorialComponent } from './dialogo-tutorial.component';

describe('DialogoTutorialComponent', () => {
  let component: DialogoTutorialComponent;
  let fixture: ComponentFixture<DialogoTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
