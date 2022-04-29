import { delay, inject, injectable } from 'tsyringe'
import { OrderController } from '~/Order'
import { RouterIstance } from '~/routes'

import * as Hapi from '@hapi/hapi'

@injectable()
export class OrderRouter implements RouterIstance {
  constructor(
    @inject(delay(() => OrderController))
    private readonly orderController: OrderController
  ) {
    this._basePath = '/orders'

    this._routers = [
      {
        method: 'GET',
        path: `${this._basePath}/`,
        handler: this.orderController.getAllOrders,
      },
      {
        method: 'GET',
        path: `${this._basePath}/{id}`,
        handler: this.orderController.getOrderById,
      },
      {
        method: 'POST',
        path: `${this._basePath}/`,
        handler: this.orderController.createNewOrder,
      },
      {
        method: 'PUT',
        path: `${this._basePath}/{id}/cancel`,
        handler: this.orderController.cancelOrder,
      },
      {
        method: 'PUT',
        path: `${this._basePath}/{id}/refund`,
        handler: this.orderController.cancelOrder,
      },
      {
        method: 'PUT',
        path: `${this._basePath}/{id}/confirm`,
        handler: this.orderController.confirmOrder,
      },
      {
        method: 'PUT',
        path: `${this._basePath}/{id}/prepare`,
        handler: this.orderController.prepare,
      },
      {
        method: 'PUT',
        path: `${this._basePath}/{id}/send`,
        handler: this.orderController.send,
      },
      {
        method: 'PUT',
        path: `${this._basePath}/{id}/startDeliver`,
        handler: this.orderController.startDeliver,
      },
      {
        method: 'PUT',
        path: `${this._basePath}/{id}/arrive`,
        handler: this.orderController.arrive,
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
