import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoRechazarComponent } from './dialogo-rechazar.component';

describe('DialogoRechazarComponent', () => {
  let component: DialogoRechazarComponent;
  let fixture: ComponentFixture<DialogoRechazarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoRechazarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoRechazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
