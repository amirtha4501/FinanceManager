import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';

import * as $ from 'jquery';
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
    PlannedTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
