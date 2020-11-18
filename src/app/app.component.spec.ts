import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import {AppComponent, IRequestParams} from './app.component';
import {ISpaceLaunchData, SpaceLaunchDataAccessService} from './spacex-launch-data/spacex-launch-data-access.service';

const launchYear = '2016';
describe('AppComponent', () => {
  let component: AppComponent;
  let spaceLaunchDataAccessService: SpyObj<SpaceLaunchDataAccessService>;
  let expectedParameters: IRequestParams;
  let expectedSpaceLaunchPrograms: ISpaceLaunchData;

  afterAll(() => {
    component = null;
    spaceLaunchDataAccessService = null;
    expectedParameters = null;
    expectedSpaceLaunchPrograms = null;
  });

  describe('On Init', () => {
    beforeEach(()  => {
      spaceLaunchDataAccessService =
        createSpyObj<SpaceLaunchDataAccessService>('SpaceLaunchDataAccessService',
          ['getSpaceLaunchPrograms']);
    });
    expectedParameters = {
      limit: 10
    };
    expectedSpaceLaunchPrograms = {
      flight_number: 1,
      mission_name: 'abc',
      mission_id: ['abc'],
      launch_year: '2016',
      launch_success: false,
      links: {
       mission_patch_small: 'abc',
     }
    };
    spaceLaunchDataAccessService.getSpaceLaunchPrograms.and.returnValue(expectedSpaceLaunchPrograms);
    component = new AppComponent(spaceLaunchDataAccessService);
    component.ngOnInit();
  });
  it('should fetch all spacex launch programs', () => {
    expect(spaceLaunchDataAccessService.getSpaceLaunchPrograms).toHaveBeenCalledTimes(1);
  });

  describe('filterLaunchProgramsByYears', () => {
    beforeEach(() => {
      expectedParameters.launch_year = launchYear;
      spaceLaunchDataAccessService.getSpaceLaunchPrograms.and.returnValue(expectedParameters);
      component.filterLaunchProgramsByYears(launchYear);
    });

    it('should call spaceLaunchDataAccessService to get the space launch programs as per the selected launch year ', () => {
      expect(spaceLaunchDataAccessService.getSpaceLaunchPrograms).toHaveBeenCalledTimes(2);
    });
    it('isActiveYear should be equal to selected launch success ', () => {
      expect(component.isActiveYear).toEqual(launchYear);
    });
  });

  describe('filterLaunchProgramsByLaunch', () => {
    beforeEach(() => {
      expectedParameters.launch_success = false;
      spaceLaunchDataAccessService.getSpaceLaunchPrograms.and.returnValue(expectedParameters);
      component.filterLaunchProgramsByLaunch(false);
    });

    it('should call spaceLaunchDataAccessService to get the space launch programs as per the selected launch year ', () => {
      expect(spaceLaunchDataAccessService.getSpaceLaunchPrograms).toHaveBeenCalledTimes(3);
    });

    it('isActiveLaunch should be equal to selected launch success ', () => {
      expect(component.isActiveLaunch).toEqual(false);
    });
  });
});
