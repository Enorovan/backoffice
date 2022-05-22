import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  productsUrl: string = 'http://localhost:8000/products/';
  productUrl: string = 'http://localhost:8000/product/';
  removeStockUrl: string ='http://localhost:8000/decrementStock/';
  addStockUrl: string ='http://localhost:8000/incrementStock/';

  getProducts() {
    return this.http.get(this.productsUrl);
  }

  updateDiscountProduct(updatedProduct) {
    return this.http.put(this.productUrl+updatedProduct.tigID+'/', updatedProduct);
  }
  removeStockProduct(updatedProduct) {
    return this.http.put(this.removeStockUrl+updatedProduct.tigID+'/'+updatedProduct.quantity_stock+'/', updatedProduct);
  }
  addStockProduct(updatedProduct) {
    return this.http.put(this.addStockUrl+updatedProduct.tigID+'/'+updatedProduct.quantity_stock+'/', updatedProduct);
  }
}
