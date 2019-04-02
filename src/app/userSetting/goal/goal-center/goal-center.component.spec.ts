import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { moqInjectorProviders, resolveMock } from 'ng-auto-moq';
import { GoalCenterComponent } from './goal-center.component';
import { GoalService } from '../goal.service';
import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { Goal } from 'app/models/goal.model';



describe('Goal Centre', ()=>{
    let goalService: GoalService;
    let fixture: ComponentFixture<GoalCenterComponent>;
    let comp: GoalCenterComponent;

    let spy: jasmine.Spy;

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations: [GoalCenterComponent],
            providers: moqInjectorProviders(GoalCenterComponent),
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();   
    }));

    beforeEach(()=>{
        fixture = TestBed.createComponent(GoalCenterComponent);
        comp = fixture.componentInstance;
        
        goalService = TestBed.get(GoalService);
        
        //spy = spyOn(goalService, 'getGoals');
        
    });

    it('should create the component', ()=>{
        expect(comp).toBeTruthy();
    });

    it('should called get Goals in NgOnInit', ()=> {
        //setup
        const someGoals = [
            {_id: '1', name: 'Goal1'} as Goal,
            {_id: '2', name: 'Goal2'} as Goal,
        ]
        resolveMock<GoalService>(GoalService, TestBed.get(Injector))
            .setup(inst=>inst.getGoals())
            .returns(cold('r', {r: someGoals}));
        
        fixture.detectChanges();

        const actual = comp.goals;

        expect(actual).toBeObservable(cold('a', {a: someGoals}));
    });
});