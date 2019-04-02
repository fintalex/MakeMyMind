import { TestBed, inject, async, fakeAsync, flush, tick } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from 'app/models/user.model';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { moqInjectorProviders, resolveMock } from 'ng-auto-moq';
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// class MockUserService {
//     updateUserLocale = jasmine.createSpy('updateUserLocale');
//     updateUserHelper = jasmine.createSpy('updateUserHelper');
//     getUserDDL = jasmine.createSpy('getUserDDL');
//     getUserById = jasmine.createSpy('getUserById');
// }

describe('UserService', () => {
    let userService: UserService;
    let authService: AuthService;
    let http: HttpClient;

    //let injector: Injector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: moqInjectorProviders(UserService)
        });

        userService = TestBed.get(UserService);
        authService = TestBed.get(AuthService);
        http = TestBed.get(HttpClient);

        authService.CurrentUser = new User();
        authService.CurrentUser._id = '1';        
    });

    it('should be created', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service).toBeTruthy();
    });

    // it('should be created with userService injected', inject([UserService, AuthService, HttpTestingController], (service: UserService, authService: AuthService, backend: HttpTestingController) => {
    //     const usersList: User[] = [
    //         {_id: '1', locale: 'ru', nickname: "Alex", username: 'alex@mail.ru', password: 'pass1', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} },
    //         {_id: '2', locale: 'ru', nickname: "Alen", username: 'alen@mail.ru', password: 'pass2', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} },
    //         {_id: '3', locale: 'ru', nickname: "Den", username: 'den@mail.ru', password: 'pass3', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} }
    //     ];
        
    //     authService.CurrentUser = new User();
    //     authService.CurrentUser._id = '2343245';

    //     service.getUserDDL('al').subscribe(users => {
    //         expect(users).toEqual(usersList);
    //     });

    //     backend.expectOne({
    //         method: 'POST',
    //         url: '/api/users/getusersddl'
    //     }).flush(usersList);
    // }));

    // xit('should be created with userService injected', fakeAsync(() => {
    //     // setup section
    //     const usersList: User[] = [
    //         {_id: '1', locale: 'ru', nickname: "Alex", username: 'alex@mail.ru', password: 'pass1', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} },
    //         {_id: '2', locale: 'ru', nickname: "Alen", username: 'alen@mail.ru', password: 'pass2', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} },
    //         {_id: '3', locale: 'ru', nickname: "Den", username: 'den@mail.ru', password: 'pass3', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} }
    //     ];

    //     const expectedUsersList: User[] = [
    //         {_id: '1', locale: 'ru', nickname: "Alex", username: 'alex@mail.ru', password: 'pass1', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} },
    //         {_id: '2', locale: 'ru', nickname: "Alen", username: 'alen@mail.ru', password: 'pass2', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} },
    //         {_id: '3', locale: 'ru', nickname: "Den", username: 'den@mail.ru', password: 'pass3', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} }
    //     ];

    //     // Here we just replace a real Request to server with a new COLD observable 
    //     // cold('r', {r: usersList}) - in our case
    //     resolveMock<HttpClient>(HttpClient, TestBed.get(Injector))
    //         .setup(instance => instance.post('/api/users/getusersddl', { str: 'al', userId: '1' }))
    //         .returns(cold('r', {r: usersList}));

    //     //action section
    //     //const tested = injector.get(UserService);
    //     const actual = userService.getUserDDL('al');

    //     getTestScheduler().flush();        

    //     //assertion section
    //     expect(actual).toBeObservable(cold('a', {a: expectedUsersList}));

    // }));

    it('should return a user Details',  ()=> {
        //Setup
        const user = {_id: '1', locale: 'ru', nickname: "Alex", username: 'alex@mail.ru', password: 'pass1', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} } as User;
        
        resolveMock<HttpClient>(HttpClient, TestBed.get(Injector))
            .setup(instance => instance.get('/api/users/getUserById/' + user._id))
            .returns(cold('r', {r: user}));

        // Action
        const actualUser = userService.getUserById('1');        

        // Assertions
        expect(actualUser).toBeObservable(cold('a', {a: user}))
    });

    it('should return UPDATED user', ()=> {
        //Setup
        const user = {_id: '1', locale: 'ru', nickname: "Alex", username: 'alex@mail.ru', password: 'pass1', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} } as User;
        const updatedUser = {_id: '1', locale: 'ru', nickname: "Alex", username: 'alex@mail.ru', password: 'pass1', helper: {calendarMainHelp: true, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} } as User;
        
        resolveMock<HttpClient>(HttpClient, TestBed.get(Injector))
            .setup(instance => instance.post('/api/users/updatehelper', user))
            .returns(cold('r', {r: updatedUser}));

        // Action
        const actualUser = userService.updateUserHelper(user);        

        // Assertions
        expect(actualUser).toBeObservable(cold('a', {a: updatedUser}))
    });

    xit('should return list of users', ()=> {
         //Setup
         const usersList: User[] = [
            {_id: '1', locale: 'ru', nickname: "Alex", username: 'alex@mail.ru', password: 'pass1', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} },
            {_id: '2', locale: 'ru', nickname: "Alen", username: 'alen@mail.ru', password: 'pass2', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} },
            {_id: '3', locale: 'ru', nickname: "Den", username: 'den@mail.ru', password: 'pass3', helper: {calendarMainHelp: false, brickTypeMainHelp: false, categoryMainHelp: false, frendsMainHelp: false,wallSideNavShow: false} }
        ];
         
         resolveMock<HttpClient>(HttpClient, TestBed.get(Injector))
             .setup(instance => instance.post('/api/user/getUserDDL', {str: 'al'}))
             .returns(cold('r', {r: usersList}));
 
         // Action
         const actualUser = userService.getUserDDL('al');        
 
         // Assertions
         expect(actualUser).toBeObservable(cold('a', {a: usersList}))
    });
});
