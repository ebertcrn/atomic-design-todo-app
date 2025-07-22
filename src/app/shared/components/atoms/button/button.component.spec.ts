import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from './button.component';
import { ButtonTypeEnum, IconsEnum } from './button.enum';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent, MatIconModule, MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit onClickButton when clicked', () => {
    spyOn(component.onClickButton, 'emit');
    component.type = ButtonTypeEnum.Flat;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    expect(component.onClickButton.emit).toHaveBeenCalled();
  });

  it('should show the label when label input is provided', () => {
    component.type = ButtonTypeEnum.Flat;
    const label = 'Test label';
    component.label = label;
    fixture.detectChanges();

    const labelEl = fixture.debugElement.query(By.css('.button__label'));

    expect(labelEl.nativeElement.textContent).toContain(label);
  });

  it('should disable button when isDisabled property is true', () => {
    component.type = ButtonTypeEnum.Flat;
    component.isDisabled = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));

    expect(button.nativeElement.disabled).toBeTrue();
  });

  Object.values(ButtonTypeEnum).forEach((type) => {
    it(`should render button with type ${type}`, () => {
      component.type = type;
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));
      expect(button).toBeTruthy();

      switch (type) {
        case ButtonTypeEnum.Flat:
          expect(button.attributes['mat-flat-button']).toBeDefined();
          break;
        case ButtonTypeEnum.Raised:
          expect(button.attributes['mat-raised-button']).toBeDefined();
          break;
        case ButtonTypeEnum.Fab:
          expect(button.attributes['mat-fab']).toBeDefined();
          break;
        case ButtonTypeEnum.MiniFab:
          expect(button.attributes['mat-mini-fab']).toBeDefined();
          break;
      }
    });

    Object.values(IconsEnum).forEach((icon) => {
      it(`should show icon "${icon}" when icon input is "${icon}"`, () => {
        component.type = ButtonTypeEnum.Flat;
        component.icon = icon;
        fixture.detectChanges();

        const iconEl = fixture.debugElement.query(By.css('mat-icon'));
        expect(iconEl).toBeTruthy();
        expect(iconEl.nativeElement.textContent.trim()).toBe(icon);
      });
    });
  });
});
