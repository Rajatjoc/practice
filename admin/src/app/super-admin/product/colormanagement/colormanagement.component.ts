import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-colormanagement',
  templateUrl: './colormanagement.component.html',
  styleUrls: ['./colormanagement.component.scss']
})
export class ColormanagementComponent implements OnInit {
  colors:any;
  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.getcolor();
  }
  getcolor(){
    this.productService.getColors().subscribe(res=>{
      console.log(res)
      this.colors=res.data
    })
  }

}
