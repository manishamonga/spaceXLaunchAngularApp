import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import {ISpaceLaunchData, SpaceLaunchDataAccessService} from './spacex-launch-data-access.service';
import {IRequestParams} from '../app.component';

describe('SpaceLaunchDataAccessService', () => {
  let service: SpaceLaunchDataAccessService;
  let httpTestingController: HttpTestingController;
  let expectedLaunchPrograms: ISpaceLaunchData;
  let expectedParams: IRequestParams;
  let observableOfLaunchPrograms: Observable<ISpaceLaunchData>;
  let spaceLaunchPrograms: ISpaceLaunchData;


  afterAll(() => {
    service = null;
    httpTestingController = null;
    expectedLaunchPrograms = null;
    expectedParams = null;
    observableOfLaunchPrograms = null;
    spaceLaunchPrograms = null;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpaceLaunchDataAccessService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(SpaceLaunchDataAccessService);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  // API Unit test with query string parameters and sharePlay unit test
  describe('getCurrentProducts()', () => {
    describe('First call to subscription', () => {
      beforeEach(() => {
        expectedLaunchPrograms = {} as ISpaceLaunchData;
        expectedParams = {
          limit: 10,
          launch_success: true,
          land_success: true,
          launch_year: '2017'
        };
        observableOfLaunchPrograms = service.getSpaceLaunchPrograms(expectedParams);
        observableOfLaunchPrograms.subscribe(result => (spaceLaunchPrograms = result));
        httpTestingController
          .expectOne((req: HttpRequest<ISpaceLaunchData>) => {
            return (
              req.urlWithParams ===
              'https://api.spaceXdata.com/v3/launches?limit=10&launch_success=true&land_success=true&launch_year=2017'
            );
          })
          .flush(expectedLaunchPrograms);
      });
      it('should call the api and return the response', () => {
        expect(spaceLaunchPrograms).toBe(expectedLaunchPrograms);
      });
    });
  });

});

