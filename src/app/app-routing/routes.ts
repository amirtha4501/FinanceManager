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


export const allroutes: Routes = [
  { path: '', redirectTo: '/desktop', pathMatch: 'full'},
  { path: 'desktop', component: DesktopComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'uncategorized', component: UncategorizedComponent},
  { path: 'template', component: TemplateComponent},
  { path: 'recurringpayment', component: RecurringPaymentComponent},
  { path: 'history', component: HistoryComponent},
  { path: 'transfer', component: TransferComponent},
  { path: 'about', component: AboutComponent},
  { path: 'review', component: ReviewComponent},
  { path: 'summary', component: SummaryComponent},
  { path: 'report', component: ReportsComponent},
  { path: 'plannedtransaction', component: PlannedTransactionComponent},
  { path: 'filter', component: FilterComponent},
  { path: 'create', component: CreateComponent}
];
  