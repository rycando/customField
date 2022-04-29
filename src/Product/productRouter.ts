import { delay, inject, injectable } from 'tsyringe'
import { ProductController } from '~/Product'
import { RouterIstance } from '~/routes'

import * as Hapi from '@hapi/hapi'

@injectable()
export class ProductRouter implements RouterIstance {
  constructor(
    @inject(delay(() => ProductController))
    private readonly productController: ProductController
  ) {
    this._basePath = '/products'

    this._routers = [
      {
        method: 'GET',
        path: `${this._basePath}/`,
        handler: this.productController.getAllProducts,
      },
      {
        method: 'GET',
        path: `${this._basePath}/{id}`,
        handler: this.productController.getProductById,
      },
      {
        method: 'POST',
        path: `${this._basePath}/`,
        handler: this.productController.createNewProduct,
      },
    ]
  }

  private _basePath: string
  private _routers: Hapi.ServerRoute[]

  get basePath() {
    return this._basePath
  }
  get routers() {
    return this._routers
  }
}
