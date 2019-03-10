import { async, ComponentFixture, TestBed, inject, tick, fakeAsync, flush } from '@angular/core/testing';
import { DebugElement } from '@angular/core'; 
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';

import { WallSideNavComponent } from './wall-side-nav.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FrendService } from '../../userSetting/frend/frend.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../services/auth.service';
import { StoreModule } from '@ngrx/store';
//import { TestStore } from '../../store/test-store';
import { TestStore } from '@testing/utils';
import * as categorySelectors from '../../store/selectors/category.selectors';
import { Store } from '@ngrx/store';
import { Category } from '../../models/category.model';
import { Observable } from 'rxjs';
import { User } from 'app/models/user.model';
import { Frend } from 'app/models/frend.model';

describe('WallSideNavComponent', () => {
    let component: WallSideNavComponent;
    let fixture: ComponentFixture<WallSideNavComponent>;
    let de: DebugElement;

    let store: TestStore<categorySelectors.State>;
    let userService: UserService;
    let frendService: FrendService;
    let authService: AuthService;
    
    let spy: jasmine.Spy;
    let categorySelectSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
             declarations: [ WallSideNavComponent ],
             imports: [ SharedModule, FormsModule, RouterModule, HttpClientTestingModule, StoreModule],
             providers: [ UserService, FrendService, AuthService,   
                { provide: Store, useClass: TestStore }   // use test store instead of ngrx store
            ]
        })
        .compileComponents();
    }));

    beforeEach(inject([Store], (testStore: TestStore<categorySelectors.State>) => {
        store = testStore;
        var mockCategories: categorySelectors.State = {
            categories: {
                ids: [ '1', '2', '3'],
                categories: [ 
                    {_id: '1', user: 'userId1', color: '#111111', description: 'desc 1', name: 'name 1'},
                    {_id: '2', user: 'userId2', color: '#222222', description: 'desc 2', name: 'name 2'},
                    {_id: '3', user: 'userId3', color: '#333333', description: 'desc 3', name: 'name 3'},
                ],
                selected: 1,
                loaded: false,
                loading: false
            }
        }
        store.setState(mockCategories);

        fixture = TestBed.createComponent(WallSideNavComponent);
        component = fixture.componentInstance;
        //de = fixture.debugElement;

        frendService = fixture.debugElement.injector.get(FrendService);
        var mockFrends: Frend[] = [
            {_id: '1', frendId: '2343', user: 'sdf'}
        ];
        spy = spyOn(frendService, 'getFrends').and.returnValues(Observable.of(mockFrends));

        // authService = fixture.debugElement.injector.get(AuthService);
        // var mockCurrentUser: User = {
        //     _id: '3523',
        //     username: 'Alex',
        //     password: '12345',
        //     nickname: 'AlexNick',
        //     locale: 'RU',
        //     helper:  { 
        //         calendarMainHelp:  true,
        //         categoryMainHelp:  true,
        //         frendsMainHelp:  true,
        //         brickTypeMainHelp:  true,
        //         wallSideNavShow: true
        //     }
        // }
        // spy = spyOn(authService, 'CurrentUser').and.returnValue(mockCurrentUser);

        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call frendServcie 1', () => {
        expect(spy.calls.any()).toBeTruthy();
    });

    it('store to be defined', async(() => { 
        expect(store).toBeDefined();
    }));

    it('should call frendServcie 2', () => {
        expect(spy).toHaveBeenCalled();
        expect(spy.calls.all().length).toEqual(1);
    });

    it('should select categories from store once', fakeAsync (()=> {
        categorySelectSpy = spyOn(store, 'select');
        store.select(categorySelectors.getAllCategories);
            // .subscribe(categories => {
            //     expect(categorySelectSpy).toHaveBeenCalledWith(1);
            // });

        // fixture.detectChanges();
        expect(categorySelectSpy).toHaveBeenCalledTimes(1);
        expect(categorySelectSpy).toHaveBeenCalledWith(categorySelectors.getAllCategories);

        flush();
    }));
});


// describe('WallSideNavComponent', () => {
//     let component: WallSideNavComponent;
//     let fixture: ComponentFixture<WallSideNavComponent>;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//         declarations: [ WallSideNavComponent ]
//         })
//         .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(WallSideNavComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
