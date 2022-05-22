import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.css']
})
export class ManageStockComponent implements OnInit {

  productService: ProductsService;

  products: any;

  selectedValueStock: number;
  selectedValueSale: number;

  stockOperation: boolean = false;

  constructor(productService: ProductsService) { this.productService = productService }

  filterProductsOfCategory(category: number){
    if(this.products && this.products.length > 0){
      return this.products.filter(product => product.category === category);
    }
  }

  updateAll(): void {
    let response = []
    const update = this.products;

      update.forEach(update => {
        const newFormData = {
          tigID: update.tigID,
          discount: update.updated_discount,
          sale: update.sale,
          price: update.price,
          quantity_stock: update.updated_quantity_stock,
          quantity_sold: update.quantity_sold,
          updated_quantity_stock: update.updated_quantity_stock,
          updated_discount: update.updated_discount
        };
        response.push(newFormData);
      })

      if (response.length > 0) {
        response.forEach(product => {
          if (this.stockOperation && product.updated_quantity_stock) {
            this.productService.addStockProduct(product).subscribe();
          } else if (product.updated_quantity_stock) {
            this.productService.removeStockProduct(product).subscribe();
          }
          if (product.updated_discount) {
            product.sale = true;
            this.productService.updateDiscountProduct(product).subscribe();
          }
        })
      }
      location.reload();
    }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
