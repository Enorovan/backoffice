import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  productService: ProductsService;
  products: any;
  selected: Product;
  isSold: boolean = true;

  formSale = new FormControl("", [Validators.max(100), Validators.min(0)])
  formStock = new FormControl("", Validators.min(0))

  autocomplete = new FormControl();
  filteredProducts: Observable<string[]>;

  constructor(productService: ProductsService) { this.productService = productService }

  updateProductSale(updatedProduct: Product) {
    const newFormData = {
      tigID : updatedProduct.tigID,
      price: updatedProduct.price,
      price_on_sale: updatedProduct.price_on_sale,
      discount: this.formSale.value,
      sale: true
    };
    
    this.productService.updateDiscountProduct(newFormData).subscribe(data => {
      this.selected = data as Product
    });
  }

  removeStock(updatedProduct: Product) {
    const newFormData = {
      tigID : updatedProduct.tigID,
      quantity_stock: this.formStock.value,
      quantity_sold: updatedProduct.quantity_sold
    };

    if (this.isSold) {
      newFormData.quantity_sold = this.formStock.value + updatedProduct.quantity_sold;
    }

    this.productService.removeStockProduct(newFormData).subscribe(data => {
      this.selected = data as Product
    });
  }

  addStock(updatedProduct: Product) {
    const newFormData = {
      tigID: updatedProduct.tigID,
      quantity_stock: this.formStock.value,
      quantity_sold: updatedProduct.quantity_sold
    };
    
    this.productService.addStockProduct(newFormData).subscribe(data => {
      this.selected = data as Product
    });
  }

  private _filter(value): string[] {
    const filterValue = value.toString().toLowerCase();

    return this.products.filter(product => product.name.toLowerCase().includes(filterValue));
  }

  updateSelected(event: MatAutocompleteSelectedEvent) {
    this.selected = event.option.value;
  }

  displayFn(product: Product): string {
    if (product)
      return product.name;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);

    this.filteredProducts = this.autocomplete.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
}
