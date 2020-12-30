import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CreateService } from '../services/create.service';
import { DesktopService } from '../services/desktop.service';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  // providers: [DatePipe]
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


  allCategories: any = [
    {
      "title": "car",
      "category": "accessories"
    },
    {
      "title": "electronics",
      "category": "accessories"
    },
    {
      "title": "car",
      "category": "amortization"
    },
    {
      "title": "entertainment",
      "category": "bar"
    },
    {
      "title": "health & beauty",
      "category": "beautician"
    },
    {
      "title": "work",
      "category": "bonus"
    },
    {
      "title": "electronics",
      "category": "camera"
    },
    {
      "title": "",
      "category": "car"
    },
    {
      "title": "car",
      "category": "car wash"
    },
    {
      "title": "",
      "category": "children"
    },
    {
      "title": "entertainment",
      "category": "cinema & theatre"
    },
    {
      "title": "home",
      "category": "cleaning products"
    },
    {
      "title": "",
      "category": "clothing"
    },
    {
      "title": "children",
      "category": "clothing"
    },
    {
      "title": "electronics",
      "category": "computer"
    },
    {
      "title": "entertainment",
      "category": "concert"
    },
    {
      "title": "health & beauty",
      "category": "cosmetics"
    },
    {
      "title": "home",
      "category": "credit"
    },
    {
      "title": "entertainment",
      "category": "disco"
    },
    {
      "title": "home",
      "category": "electricity"
    },
    {
      "title": "",
      "category": "electronics"
    },
    {
      "title": "",
      "category": "entertainment"
    },
    {
      "title": "food",
      "category": "every day"
    },
    {
      "title": "",
      "category": "food"
    },
    {
      "title": "car",
      "category": "fuel"
    },
    {
      "title": "home",
      "category": "furniture"
    },
    {
      "title": "entertainment",
      "category": "games"
    },
    {
      "title": "electronics",
      "category": "games"
    },
    {
      "title": "home",
      "category": "gas"
    },
    {
      "title": "health & beauty",
      "category": "hairdresser"
    },
    {
      "title": "",
      "category": "health & beauty"
    },
    {
      "title": "home",
      "category": "heating"
    },
    {
      "title": "entertainment",
      "category": "holiday"
    },
    {
      "title": "",
      "category": "home"
    },
    {
      "title": "car",
      "category": "insurance"
    },
    {
      "title": "home",
      "category": "insurance"
    },
    {
      "title": "home",
      "category": "internet"
    },
    {
      "title": "clothing",
      "category": "jackets"
    },
    {
      "title": "clothing",
      "category": "jewellery"
    },
    {
      "title": "health & beauty",
      "category": "medicament"
    },
    {
      "title": "health & beauty",
      "category": "nutrients"
    },
    {
      "title": "work",
      "category": "other"
    },
    {
      "title": "health & beauty",
      "category": "perfume"
    },
    {
      "title": "children",
      "category": "pocket money"
    },
    {
      "title": "electronics",
      "category": "printer"
    },
    {
      "title": "home",
      "category": "rent"
    },
    {
      "title": "car",
      "category": "repairs"
    },
    {
      "title": "home",
      "category": "repairs"
    },
    {
      "title": "food",
      "category": "restaurant"
    },
    {
      "title": "car",
      "category": "review"
    },
    {
      "title": "work",
      "category": "salary"
    },
    {
      "title": "children",
      "category": "school"
    },
    {
      "title": "clothing",
      "category": "shirts"
    },
    {
      "title": "clothing",
      "category": "shoes"
    },
    {
      "title": "health & beauty",
      "category": "solarium"
    },
    {
      "title": "food",
      "category": "supermarket"
    },
    {
      "title": "clothing",
      "category": "sweaters"
    },
    {
      "title": "clothing",
      "category": "t-shirt"
    },
    {
      "title": "electronics",
      "category": "tablet"
    },
    {
      "title": "home",
      "category": "telephone"
    },
    {
      "title": "electronics",
      "category": "telephone"
    },
    {
      "title": "children",
      "category": "toys"
    },
    {
      "title": "entertainment",
      "category": "trips"
    },
    {
      "title": "clothing",
      "category": "trouser"
    },
    {
      "title": "home",
      "category": "t v"
    },
    {
      "title": "electronics",
      "category": "t v"
    },
    {
      "title": "clothing",
      "category": "underwear"
    },
    {
      "title": "home",
      "category": "water"
    },
    {
      "title": "",
      "category": "work"
    },
  ];

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
    // public datepipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getTransactions();
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

    // let setupVal = this.val;
    // console.log(id);
    let detail = { starred: !starred };
    this.categoryService.updateCategory(id, detail).subscribe(
      (res) => {
        this.getCategories();
        this.router.navigateByUrl('/about', { skipLocationChange: false }).then(() => {
          this.router.navigate(['category']);;
        });

      },
      (err) => {
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
    this.categories.sort(function (a, b) {
      var textA = a.name;
      var textB = b.name;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  sortSubCategories() {
    for (let i = 0; i < this.categories.length; i++) {
      this.categories[i].subCategories.sort(function (a, b) {
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
      (err) => {
        // alert(err + "error");
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
          (err) => { alert(categoryParentId); }
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
    return this.transactedCategories.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
}
