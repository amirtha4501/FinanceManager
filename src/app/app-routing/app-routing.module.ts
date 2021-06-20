import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsResolver } from '../services/reports.resolver';
import { SummaryResolver } from '../services/summary.resolver';
import { allroutes } from './routes';

const routes: Routes = allroutes; // sets up routes constant where you define your routes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [SummaryResolver, ReportsResolver],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// authorizedRoute = {
//     path: '', component: AuthLayoutComponent,
//     children: [
//         // { path: '', component: DesktopComponent },
//         { path: '', redirectTo: 'desktop', pathMatch: 'full' },
//         { path: 'desktop', component: DesktopComponent },
//         { path: 'category', component: CategoryComponent },
//         { path: 'uncategorized', component: UncategorizedComponent },
//         { path: 'template', component: TemplateComponent },
//         { path: 'recurringpayment', component: RecurringPaymentComponent },
//         { path: 'history', component: HistoryComponent },
//         { path: 'transfer', component: TransferComponent },
//         { path: 'about', component: AboutComponent },
//         { path: 'review', component: ReviewComponent },
//         { path: 'summary', component: SummaryComponent },
//         { path: 'report', component: ReportsComponent },
//         { path: 'plannedtransaction', component: PlannedTransactionComponent },
//         { path: 'filter', component: FilterComponent },
//         { path: 'create', component: CreateComponent },
//         { path: 'notification', component: NotificationComponent }
//     ]
// };

// unauthorizedRoute =  {
//     path: '', component: PublicLayoutComponent,
//     children: [
//         // { path: '', component: SigninComponent },
//         { path: '', redirectTo: 'signin', pathMatch: 'full' },
//         { path: 'signin', component: SigninComponent },
//         { path: 'signup', component: SignupComponent }
//     ]
// };

// authValidator() {
//     if (this.authService.isUserLoggedIn()) {
//         routes.push(this.authorizedRoute);
//     } else {
//         routes.push(this.unauthorizedRoute);
//     }
// }