import {NgModule} from '@angular/core';
import { BackendService } from '../core/services/backend.service';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';

import { ChartsModule } from 'ng2-charts';
import { DashboardRoutingModule } from './dashboard.routing';

const components = [DashboardComponent];
const modules = [SharedModule, ChartsModule, DashboardRoutingModule];


@NgModule({
    declarations:components,
    imports:modules,
    exports:[...modules, ...components],
    providers:[BackendService]
})
export class DashboardModule {

}