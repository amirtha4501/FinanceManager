import { Routes } from '@angular/router';
import { DesktopComponent } from '../desktop/desktop.component';
import { CategoryComponent } from '../category/category.component';
import { UncategorizedComponent } from '../uncategorized/uncategorized.component';
import { TemplateComponent } from '../template/template.component';
import { RecurringPaymentComponent } from '../recurring-payment/recurring-payment.component';
import { HistoryComponent } from '../history/history.component';
import { TransferComponent } from '../transfer/transfer.component';
import { ReviewComponent } from '../review/review.component';
import { SummaryComponent } from '../summary/summary.component';
import { PlannedTransactionComponent } from '../planned-transaction/planned-transaction.component';
import { AboutComponent } from '../about/about.component';
import { FilterComponent } from '../filter/filter.component';
import { CreateComponent } from '../create/create.component';
import { ReportsComponent } from '../reports/reports.component';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { NotificationComponent } from '../notification/notification.component';

import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';
import { MainLayoutComponent } from '../main-layout/main-layout.component';
import { AuthGuard } from '../services/auth.guard';
import { MainGuard } from '../services/main.guard';


export const allroutes: Routes = [
  {
    path: '', component: AuthLayoutComponent,
    children: [
      { path: '', component: SigninComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent }
    ],
    canActivate: [MainGuard]
  },

  {
    path: '', component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'desktop', pathMatch: 'full' },
      { path: '', component: DesktopComponent },
      { path: 'desktop', component: DesktopComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'uncategorized', component: UncategorizedComponent },
      { path: 'template', component: TemplateComponent },
      { path: 'recurringpayment', component: RecurringPaymentComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'transfer', component: TransferComponent },
      { path: 'about', component: AboutComponent },
      { path: 'review', component: ReviewComponent },
      { path: 'summary', component: SummaryComponent },
      { path: 'report', component: ReportsComponent },
      { path: 'plannedtransaction', component: PlannedTransactionComponent },
      { path: 'filter', component: FilterComponent },
      { path: 'create', component: CreateComponent },
      { path: 'notification', component: NotificationComponent }
    ],
    canActivate: [AuthGuard]
  },

];
