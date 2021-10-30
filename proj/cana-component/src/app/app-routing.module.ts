import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionComponent } from './automation/configuration/action/action.component';
import { CreateActionComponent } from './automation/configuration/action/createaction/createaction.component';
import { EnvironmentComponent } from './automation/configuration/environment/environment.component';
import { EnvironmentVariableComponent } from './automation/configuration/environmentvariable/environmentvariable.component';
import { GlobalvariableComponent } from './automation/configuration/globalvariable/globalvariable.component';
import { HomeComponent } from './automation/configuration/home/home.component';
import { TestcaseComponent } from './automation/configuration/testcase/testcase.component';
import { TestplanComponent } from './automation/configuration/testplan/testplan.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'configuration',
    component: HomeComponent,
    children: [
      {
        path: 'globalvariables',
        component: GlobalvariableComponent,
      },
      {
        path: 'environments',
        component: EnvironmentComponent,
      },
      {
        path: 'environments/:environmentid/environmentvariables',
        component: EnvironmentVariableComponent,
      },
      {
        path: 'testplans',
        component: TestplanComponent,
      },
      {
        path: 'testcases',
        component: TestcaseComponent,
      },
      {
        path: 'testplans/:testplanid/testcases/:testcaseid',
        component: TestcaseComponent,
      },
      {
        path: 'testplans/:testplanid/testcases',
        component: TestcaseComponent,
      },
      {
        path: 'testplans/:testplanid/testcases/:testcaseid/actions',
        component: ActionComponent,
      },
      {
        path: 'testcases/:testcaseid/actions',
        component: ActionComponent,
      },
    ],
  },
  {
    path: 'testcases/:testcaseid/actions/create',
    component: CreateActionComponent,
  },
  {
    path: 'configuration/testplans/:testplanid/testcases/:testcaseid/actions/create',
    component: CreateActionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
