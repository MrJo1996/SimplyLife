import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaScadenzaPage } from './modifica-scadenza.page';

describe('ModificaScadenzaPage', () => {
  let component: ModificaScadenzaPage;
  let fixture: ComponentFixture<ModificaScadenzaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaScadenzaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaScadenzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
