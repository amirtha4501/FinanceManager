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
import { PublicLayoutComponent } from '../public-layout/public-layout.component';
import { AuthGuard } from '../services/auth.guard';
import { PublicGuard } from '../services/public.guard';
import { SummaryResolver } from '../services/summary.resolver';
import { ReportsResolver } from '../services/reports.resolver';
import { CaptureComponent } from '../capture/capture.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';


export const allroutes: Routes = [
    {
        path: '', component: PublicLayoutComponent,
        children: [
            { path: '', component: SigninComponent },
            // { path: '', redirectTo: 'signin', pathMatch: 'full' },
            { path: 'signin', component: SigninComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'capture', component: CaptureComponent }
        ],
        canActivate: [PublicGuard]
    },
    {
        path: '', component: AuthLayoutComponent,
        children: [
            { path: '', component: DesktopComponent },
            // { path: '', redirectTo: 'desktop', pathMatch: 'full' },
            { path: 'desktop', component: DesktopComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'uncategorized', component: UncategorizedComponent },
            { path: 'template', component: TemplateComponent },
            { path: 'recurringpayment', component: RecurringPaymentComponent },
            { path: 'history', component: HistoryComponent },
            { path: 'transfer', component: TransferComponent },
            { path: 'about', component: AboutComponent },
            { path: 'review', component: ReviewComponent },
            { path: 'summary', component: SummaryComponent, resolve: {summary: SummaryResolver} },
            { path: 'report', component: ReportsComponent, resolve: {report: ReportsResolver} },
            { path: 'plannedtransaction', component: PlannedTransactionComponent },
            { path: 'filter', component: FilterComponent },
            { path: 'create', component: CreateComponent },
            { path: 'file-upload', component: FileUploadComponent },
            { path: 'notification', component: NotificationComponent }
        ],
        canActivate: [AuthGuard]
    },
];
