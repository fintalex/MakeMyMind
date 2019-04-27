import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalConditionComponent } from './goal-condition.component';
import { BrickComponent } from 'app/components/brick/brick.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('GoalConditionComponent', () => {
    let component: GoalConditionComponent;
    let fixture: ComponentFixture<GoalConditionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GoalConditionComponent, BrickComponent],
            
            imports: [ SharedModule, ReactiveFormsModule, BrowserAnimationsModule],
            //schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GoalConditionComponent);
        component = fixture.componentInstance;

        component.condition = { neededCount: 3, markedCount: 2, brickType: {category: {color: '#555555'}, isIcon: true, type: 1}} as any; 

        fixture.detectChanges();
    });

    it('should show conditions', () => {
        expect(component.condition).toBeTruthy();
        expect(component.condition.neededCount).toBe(3);
        expect(fixture.nativeElement.querySelectorAll('.condition-point').length).toBe(3);
    });
});
