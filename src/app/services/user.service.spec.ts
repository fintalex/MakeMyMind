import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from 'app/models/user.model';

describe('UserService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [UserService, AuthService]
    }));

    it('should be created', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service).toBeTruthy();
    });

    it('should be created with userService injected', inject([UserService, AuthService, HttpTestingController], (service: UserService, authService: AuthService, backend: HttpTestingController) => {
        expect(service).toBeTruthy();
        authService.CurrentUser = new User();
        authService.CurrentUser._id = '2343245';

        service.getUserDDL('us').subscribe(users => {
            expect(users).toHaveBeenCalled
        });

        // backend.expectOne({
        //     method: 'POST',
        //     url: '/api/users/getusersddl', 
        //     str: val, userId: this.authService.CurrentUser._id })
    }));
});
