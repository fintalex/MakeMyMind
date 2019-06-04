import { async, ComponentFixture, TestBed, flush, fakeAsync } from '@angular/core/testing';
import { moqInjectorProviders, resolveMock } from 'ng-auto-moq';
import { GoalCenterComponent } from './goal-center.component';
import { GoalService } from '../goal.service';
import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { cold } from 'jasmine-marbles';
import { Goal } from 'app/models/goal.model';
import { Observable, from, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'app/services/auth.service';



describe('Goal Centre', ()=>{
    let goalService: GoalService;
    let fixture: ComponentFixture<GoalCenterComponent>;
    let comp: GoalCenterComponent;

    let mockRouter = {
        navigate: jasmine.createSpy('navigate')
    }

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations: [GoalCenterComponent],
            imports: [HttpClientTestingModule],
            //providers: moqInjectorProviders(GoalCenterComponent),
            providers: [GoalService, AuthService, 
                {provide: Router, useValue: mockRouter}
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();   
    }));

    beforeEach(()=>{
        fixture = TestBed.createComponent(GoalCenterComponent);  
        
        comp = fixture.componentInstance;        

        //goalService = fixture.debugElement.injector.get(GoalService);
        goalService = TestBed.get(GoalService);
       
    });

    it('should create the component', ()=>{
        expect(comp).toBeTruthy();
    });

    it('should show 3 goal-cards', ()=>{
        
        //setup
        const someGoals = [
            {_id: '1', name: 'Goal1'} as Goal,
            {_id: '2', name: 'Goal2'} as Goal,
            {_id: '3', name: 'Goal3'} as Goal,
        ];

        // action
        spyOn(goalService, 'getGoals').and.returnValue(of(someGoals));

        // spyOn(this.goalService, 'getGoals').and.callFake(() => {
        //     return from(someGoals);
        // });

        fixture.detectChanges();
        

        // expectation
        expect(fixture.nativeElement.querySelectorAll('.goal-card').length).toBe(3);
    });

    it('should called get Goals in NgOnInit', ()=> {
        //setup
        const someGoals2 = [
            {_id: '1', name: 'Goal1'} as Goal,
            {_id: '2', name: 'Goal2'} as Goal,
        ];

        // resolveMock<GoalService>(GoalService, TestBed.get(Injector))
        //     .setup(inst=>inst.getGoals())
        //     .returns(cold('r', {r: someGoals}));
        let spy = spyOn(goalService, 'getGoals').and.returnValue(of(someGoals2));
        
        fixture.detectChanges();

        //const actual = comp.goals;

        expect(spy).toHaveBeenCalled();//(cold('a', {a: someGoals2}));
    });

    it('should navigate to goal with special id', ()=>{
        comp.goToGoalDetails(5);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/goals/5']);
    });
});