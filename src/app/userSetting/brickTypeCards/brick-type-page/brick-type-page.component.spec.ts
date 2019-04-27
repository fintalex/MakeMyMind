import { async, TestBed, ComponentFixture } from "@angular/core/testing";
import { BrickTypePageComponent } from "./brick-type-page.component";
import { CUSTOM_ELEMENTS_SCHEMA, Injector } from "@angular/core";
import { moqInjectorProviders, resolveMock } from "ng-auto-moq";
import { SharedModule } from "app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TestStore } from "@testing/utils";
import * as categorySelectors from '../../../store/selectors/category.selectors';
import { Store } from "@ngrx/store";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { BrickTypeService } from "app/userSetting/brickType/brickType.service";
import { cold } from "jasmine-marbles";

const fakeActivatedRoute = {
    snapshot: {
        paramMap: {
            get(id){
                return '1';
            }
        }
    }
};

describe('BrickTypePageComponent', ()=> {
    let component: BrickTypePageComponent;
    let fixture: ComponentFixture<BrickTypePageComponent>;
    let store: TestStore<categorySelectors.State>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BrickTypePageComponent ],
            providers: [
                moqInjectorProviders(BrickTypePageComponent), 
                { provide: Store, useClass: TestStore },
                //{ provide: ActivatedRoute, useFactory: () => fakeActivatedRoute}
                { 
                    provide: ActivatedRoute, 
                    useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({id: 1})
                        }
                    }
                }
            ],
            imports: [ SharedModule, ReactiveFormsModule, TranslateModule.forRoot(), BrowserAnimationsModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() =>{
        fixture = TestBed.createComponent(BrickTypePageComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);

        resolveMock<BrickTypeService>(BrickTypeService, TestBed.get(Injector))
            .setup(inst=>inst.getBrickType(1))
            .returns(cold('r', {r: null}))

        fixture.detectChanges();
    });

    it('should be created', ()=> {
        expect(component).toBeTruthy();
    })
})