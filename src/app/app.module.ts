import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';

import { DesktopComponent } from './desktop/desktop.component';
import { CategoryComponent } from './category/category.component';
import { UncategorizedComponent } from './uncategorized/uncategorized.component';
import { TemplateComponent } from './template/template.component';
import { RecurringPaymentComponent } from './recurring-payment/recurring-payment.component';
import { HistoryComponent } from './history/history.component';
import { TransferComponent } from './transfer/transfer.component';
import { AboutComponent } from './about/about.component';
import { ReviewComponent } from './review/review.component';
import { SummaryComponent } from './summary/summary.component';
import { PlannedTransactionComponent } from './planned-transaction/planned-transaction.component';
import { FilterComponent } from './filter/filter.component';
import { CreateComponent } from './create/create.component';
import { ReportsComponent } from './reports/reports.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NotificationComponent } from './notification/notification.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { AuthGuard } from './services/auth.guard';
import { PublicGuard } from './services/public.guard';

@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    CategoryComponent,
    UncategorizedComponent,
    TemplateComponent,
    RecurringPaymentComponent,
    HistoryComponent,
    TransferComponent,
    AboutComponent,
    ReviewComponent,
    SummaryComponent,
    PlannedTransactionComponent,
    FilterComponent,
    CreateComponent,
    ReportsComponent,
    SigninComponent,
    SignupComponent,
    NotificationComponent,
    AuthLayoutComponent,
    PublicLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, PublicGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
