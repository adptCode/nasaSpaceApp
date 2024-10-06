import { TestBed } from '@angular/core/testing';

import { DatosNasaService } from './datos-nasa.service';

describe('DatosNasaService', () => {
  let service: DatosNasaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosNasaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
