import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService for user-friendly notifications

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  productForm: FormGroup;
  categories: string[] = ['Electronics', 'Books', 'Clothing', 'Home Appliances'];
  selectedFile: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ProductService,
    private toastr: ToastrService // Inject ToastrService for notifications
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      offerPrice: [''],
      category: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.selectedFile = event.target.result;
      };
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const data = {
        name: this.productForm.get('name')?.value,
        old_price: this.productForm.get('price')?.value,
        new_price: this.productForm.get('offerPrice')?.value,
        category: this.productForm.get('category')?.value,
        image: this.selectedFile
      };

      this.apiService.onAddProduct(data).subscribe({
        next: (response) => {
          // Handle successful response
          this.toastr.success('Product added successfully!', 'Success');
        },
        error: (err) => {
          // Handle errors from the API
          this.toastr.error('Failed to add the product. Please try again.', 'Error');
        }
      });
    } else {
      // Handle frontend form validation errors
      this.toastr.error('Please fill out all required fields correctly.', 'Validation Error');
    }
  }
}



// {
//   "name": "Cloths",
//   "description": "This is a detailed description of the Cloths product.",
//   "category": "Cloths",
//   "brand": "Cloths Brand",
//   "sku": "Cls-12809",
//   "old_price": 99.99,
//   "new_price": 79.99,
//   "stockQuantity": 50,
//   "images": ["http://localhost:4000/images/product_1718452954014.png"],
//   "videos": ["https://example.com/videos/product_demo.mp4"],
//   "specifications": {
//       "dimensions": "10x5x3 inches",
//       "weight": "1.5 lbs",
//       "color": "Black",
//       "material": "Cotton",
//       "modelNumber": "SP-12345"
//   },
//   "variants": {
//       "size": ["Small", "Medium", "Large"],
//       "color": ["Black", "White", "Blue"]
//   },
//   "shipping": {
//       "shippingWeight": "2 lbs",
//       "shippingDimensions": "12x6x4 inches",
//       "shippingCost": 5.99,
//       "shippingTime": "3-5 business days"
//   },
//   "seoInfo": {
//       "metaTitle": "Cloths Product - Buy Now",
//       "metaDescription": "Purchase the Cloths Product online at the best price.",
//       "metaKeywords": ["Cloth product", "Cloth"],
//       "slug": "Clothse"
//   }
// }
