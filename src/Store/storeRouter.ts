import { delay, inject, injectable } from 'tsyringe'
import { CustomerController } from '~/Customer'
import { OrderController } from '~/Order'
import { ProductController } from '~/Product'
import { RouterIstance } from '~/routes'
import { StoreController } from '~/Store'

import * as Hapi from '@hapi/hapi'

@injectable()
export class StoreRouter implements RouterIstance {
  constructor(
    @inject(delay(() => StoreController))
    private readonly storeController: StoreController,
    @inject(delay(() => OrderController))
    private readonly orderController: OrderController,
    @inject(delay(() => ProductController))
    private readonly productController: ProductController,
    @inject(delay(() => CustomerController))
    private readonly customerController: CustomerController
  ) {
    this._basePath = '/stores'

    this._routers = [
      {
        method: 'GET',
        path: `${this._basePath}/`,
        handler: this.storeController.getAllStores,
      },
      {
        method: 'GET',
        path: `${this._basePath}/{id}`,
        handler: this.storeController.getStoreById,
      },
      {
        method: 'GET',
        path: `${this._basePath}/{id}/orders`,
        handler: this.orderController.getStoreOrders,
      },
      {
        method: 'GET',
        path: `${this._basePath}/{id}/customers`,
        handler: this.customerController.getStoreCustomers,
      },
      {
        method: 'GET',
        path: `${this._basePath}/{id}/products`,
        handler: this.productController.getStoreProducts,
      },
      {
        method: 'POST',
        path: `${this._basePath}/`,
        handler: this.storeController.createNewStore,
      },
      {
        method: 'PUT',
        path: `${this._basePath}/{id}`,
        handler: this.storeController.updateStore,
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
