import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { UserService } from 'app/services/user.service';
import { moqInjectorProviders, resolveMock } from 'ng-auto-moq';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { User } from 'app/models/user.model';
import { Injector } from '@angular/core';
import { It } from 'moq.ts';
import { AuthService } from 'app/services/auth.service';

describe('UserDetailsComponent', () => {
    let component: UserDetailsComponent;
    let fixture: ComponentFixture<UserDetailsComponent>;
    let authService: AuthService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserDetailsComponent],
            providers: moqInjectorProviders(UserDetailsComponent)
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance;
        authService = TestBed.get(AuthService);
        authService.CurrentUser = new User();
        authService.CurrentUser._id = '1';
    });

    it('should create', () => {
        resolveMock<UserService>(UserService, TestBed.get(Injector))
        .setup(inst=>inst.getUserById(It.IsAny()))
        .returns(cold(''));
        
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should get user details by id', ()=> {
        // setup
        const user = {_id: '1', nickname: 'Alex', username: 'al@mail.ru'} as User;      

        resolveMock<UserService>(UserService, TestBed.get(Injector))
            .setup(instance => instance.getUserById('1'))
            .returns(cold('r', {r: user}));

        fixture.detectChanges();

        // action
        let actual = component.user$;

        // expectation
        expect(actual).toBeObservable(cold('u', {u: user}));
    });
});