import { Product } from "./../product.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
  product!: Product;

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.readById(Number(id)).subscribe((product) => {
      this.product = product;
    });
  }

  deleteProduct(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.delete(Number(id)).subscribe(() => {
      this.productService.showMessage("Deletado com sucesso");
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
