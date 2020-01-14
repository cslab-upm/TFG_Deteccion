import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectadosComponent } from './detectados.component';

describe('PanelComponent', () => {
  let component: DetectadosComponent;
  let fixture: ComponentFixture<DetectadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
