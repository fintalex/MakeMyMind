import { DateRu } from './dateru.pipe';
import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from 'app/services/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'app/models/user.model';

describe('DateRu', () => {

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [AuthService]
        });
    });

    it('create an instance', inject([AuthService], (service: AuthService) => {
        const pipe = new DateRu(service);
        expect(pipe).toBeTruthy();
    }));

    it('should convert date to ru', inject([AuthService], (service: AuthService) => {
        const pipe = new DateRu(service);
        service.CurrentUser = new User();
        service.CurrentUser.locale = 'ru';
        expect(pipe.transform('05.05.2019', 'MMMM YYYY')).toEqual('май 2019');
    }));

    it('should convert date to en', inject([AuthService], (service: AuthService) => {
        const pipe = new DateRu(service);
        service.CurrentUser = new User();
        service.CurrentUser.locale = 'en';
        expect(pipe.transform('06.23.2019', 'MMMM YYYY')).toEqual('June 2019');
    }));
});
