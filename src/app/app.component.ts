import {Component, OnInit} from '@angular/core';
import {ISpaceLaunchData, SpaceLaunchDataAccessService} from './spacex-launch-data/spacex-launch-data-access.service';
export interface IRequestParams {
  limit: number;
  launch_success?: boolean;
  land_success?: boolean;
  launch_year?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  public spaceLaunchPrograms: Partial<ISpaceLaunchData>;
  public authorName = 'Manisha Monga';
  public isActiveYear;
  public isActiveLaunch;
  public launchYears =
    ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
  public launches = [true, false];
  // tslint:disable-next-line:variable-name
  private _params: IRequestParams;
  // tslint:disable-next-line:variable-name
  constructor(private _spaceLaunchDataAccessService: SpaceLaunchDataAccessService) {
  console.log('comes in the constructor');
  }

  ngOnInit(): void {
    console.log('comes here');
    this._params = {
      limit: 100
    };
    this._getLaunchPrograms(this._params);
  }

  public filterLaunchProgramsByYears(selectedYear: string): void {
    this.isActiveYear = selectedYear;
    this._params.launch_year = selectedYear;
    this._getLaunchPrograms(this._params);
  }

  public filterLaunchProgramsByLaunch(successfulLaunchValue: boolean): void {
    this.isActiveLaunch = !this.isActiveLaunch;
    this._params.launch_success = successfulLaunchValue;
    this._getLaunchPrograms(this._params);
  }

  private _getLaunchPrograms(params: IRequestParams): void {
    this._spaceLaunchDataAccessService.getSpaceLaunchPrograms(params).subscribe(data => {
      this.spaceLaunchPrograms = data;
    });
  }

}
