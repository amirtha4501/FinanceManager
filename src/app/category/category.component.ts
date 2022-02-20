import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CreateService } from '../services/create.service';
import { DesktopService } from '../services/desktop.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {

  val: number = 1;
  searchToggler: boolean = false;
  isStarred: boolean;
  categories: any = [];
  rawCategories: any = [];
  reverseCategories: any = [];
  transactedCategories: any = [];
  parentName: string = null;

  basicCategories: any = [
    {
      "parentCategory": [
        "food",
        "food general",
        "supermarket",
        "restaurant",
        "every day"
      ]
    },
    {
      "parentCategory": [
        "entertainment",
        "entertainment general",
        "cinema and theatre",
        "disco",
        "bar",
        "holiday",
        "concert",
        "games",
        "trips",
      ]
    },
    {
      "parentCategory": [
        "car",
        "car general",
        "fuel",
        "repairs",
        "amortization",
        "insurance",
        "review",
        "car wash",
        "accessories"
      ]
    },
    {
      "parentCategory": [
        "home",
        "home general",
        "electricity",
        "water",
        "gas",
        "heating",
        "rent",
        "credit",
        "insurance",
        "internet",
        "t v",
        "telephone",
        "furniture",
        "repairs",
        "cleaning products"
      ]
    },
    {
      "parentCategory": [
        "clothing",
        "clothing general",
        "trousers",
        "shoes",
        "sweaters",
        "shirts",
        "jackets",
        "t-shirts",
        "jewellery",
        "underwear"
      ]
    },
    {
      "parentCategory": [
        "electronics",
        "electronics general",
        "computer",
        "tablet",
        "telephone",
        "t v",
        "printer",
        "camera",
        "games",
        "accessories"
      ]
    },
    {
      "parentCategory": [
        "health",
        "health & beauty general",
        "cosmetics",
        "perfume",
        "hairdresser",
        "beautician",
        "solarium",
        "medicament",
        "nutrients"
      ]
    },
    {
      "parentCategory": [
        "children",
        "children general",
        "toys",
        "clothing",
        "school",
        "pocket money"
      ]
    },
    {
      "parentCategory": [
        "work",
        "work general",
        "salary",
        "bonus",
        "other"
      ]
    },
  ];

  constructor(
    private createService: CreateService,
    private desktopService: DesktopService,
    private categoryService: CategoryService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getTransactions();
  }

  setLineStyle() {
    let starred = document.getElementsByClassName('starred-line');
    let element = starred[starred?.length - 1];
    element?.classList?.add("last-star");
    // return 'yuyu'
  }

  searchToggle() {
    this.searchToggler = !this.searchToggler;
  }

  expContent(val: number) {
    this.val = val;

    if (this.val == 1) {
      this.categories = this.rawCategories;
    } else if (this.val == 2 || this.val == 3) {
      this.sortCategories();
      this.sortSubCategories();
    } else if (this.val == 4) {
      this.categories = this.reverseCategories.reverse(); // check
    }

    return this.val;
  }

  modifyStar(id: number, starred: boolean) {

    let detail = { starred: !starred };
    this.categoryService.updateCategory(id, detail).subscribe(
      (res) => {
        this.getCategories();
        this.toastService.success('Modified favourites');
        this.router.navigateByUrl('/about', { skipLocationChange: false }).then(() => {
          this.router.navigate(['category']);;
        });

      },
      () => {
        // this.toastService.error('Oops! You cannot add it to favorites');
        // alert("Oops! You cannot add it to favorites");
      });
  }

  enableComponent() {
    this.createService.isCategory = true;
    this.createService.isDesktop = false;
    this.createService.isUncategory = false;
    this.createService.isHistory = false;
    this.createService.isTemplate = false;
    this.createService.isRecurringPayment = false;
    this.createService.isPlannedTransaction = false;
    this.createService.isTransfer = false;
    this.createService.createName = "New category";
  }

  sortCategories() {
    this.categories.sort(function (a: { name: any; }, b: { name: any; }) {
      var textA = a.name;
      var textB = b.name;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  sortSubCategories() {
    for (let i = 0; i < this.categories.length; i++) {
      this.categories[i].subCategories.sort(function (a: { name: any; }, b: { name: any; }) {
        var textA = a.name;
        var textB = b.name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        this.rawCategories = Array.from(this.categories);
        this.reverseCategories = Array.from(this.categories);
      },
      () => {
        this.toastService.error("Categories not found");
      }
    )
  }

  getTransactions() {
    this.desktopService.getTransactions().subscribe(
      (transactions) => {
        let transactionsData: any = transactions;
        this.setData(transactionsData);
      },
      (err) => {
        // if (err.status == '404') { this.toastService.error("Transactions not found") }
      }
    );
  }

  setData(transactionsData: any[]) {
    for (let i = 0; i < transactionsData.length; i++) {
      let categoryParentId = transactionsData[i].category['parent_id'];

      if (categoryParentId !== null) {
        this.categoryService.getCategoryById(categoryParentId).subscribe(
          (category) => {
            this.parentName = category['name']

            let transactedCategory = {
              id: transactionsData[i].category['id'],
              name: transactionsData[i].category['name'],
              parent: this.parentName,
              type: transactionsData[i].category['type'],
              starred: transactionsData[i].category['starred'],
              color: transactionsData[i].category['color'],
              date: transactionsData[i].date
            }
            this.transactedCategories.push(transactedCategory);
          },
          (err) => { console.log(categoryParentId); }
        );
      } else {
        let transactedCategory = {
          id: transactionsData[i].category['id'],
          name: transactionsData[i].category['name'],
          parent: null,
          type: transactionsData[i].category['type'],
          starred: transactionsData[i].category['starred'],
          color: transactionsData[i].category['color'],
          date: transactionsData[i].date
        }
        this.transactedCategories.push(transactedCategory);

      }
    }
  }

  get sortData() {
    this.transactedCategories.forEach((category: { date: string | number | Date; }) => {
      category.date = moment(new Date(category.date)).format('MMM D, YYYY');
    });
    return this.transactedCategories.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
}
