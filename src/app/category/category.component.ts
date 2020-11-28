import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  val: number = 1;
  searchToggler: boolean = false;
  isStarred: boolean;
  categories:any = [];

  historyCategories: any = [
    {
      "category": "Entertainment"
    }, 
    {
      "category": "Food"
    }, 
    {
      "category": "Work"
    } 
  ];

  starredCategories: any = [
    {
      "title": "car",
      "category": "accessories"
    },
    {
      "title": "electronics",
      "category": "accessories"
    },
    {
      "title": "food",
      "category": "restaurant"
    }
  ];

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
    private categoryService: CategoryService
  ) { 
    
  }

  ngOnInit(): void {
    this.getCategories();
  }

  searchToggle() {
    this.searchToggler = !this.searchToggler;
  }

  expContent(val: number) {
    this.val = val;
    return this.val;
  }

  modifyStar(id: number, starred: boolean) {
    
    let detail = { starred: !starred};
    this.categoryService.updateCategory(id, detail).subscribe(
      (res) => {
        console.log(res);
        this.getCategories();
      },
      (err) => {
        alert("Oops! You cannot add it to favorites");
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

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (err) => {
        console.log(err + "error");
      }
    )
  }
  
}
