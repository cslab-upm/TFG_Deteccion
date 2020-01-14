import { TestBed } from '@angular/core/testing';

import { ActualizarAppService } from './actualizar-app.service';

describe('ActualizarAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActualizarAppService = TestBed.get(ActualizarAppService);
    expect(service).toBeTruthy();
  });
});
