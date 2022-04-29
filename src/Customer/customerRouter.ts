import { delay, inject, injectable } from 'tsyringe'
import { CustomerController } from '~/Customer'
import { RouterIstance } from '~/routes'

import * as Hapi from '@hapi/hapi'

@injectable()
export class CustomerRouter implements RouterIstance {
  constructor(
    @inject(delay(() => CustomerController))
    private readonly customerController: CustomerController
  ) {
    this._basePath = '/customers'

    this._routers = [
      {
        method: 'GET',
        path: `${this._basePath}/`,
        handler: this.customerController.getAllCustomers,
      },
      {
        method: 'GET',
        path: `${this._basePath}/{id}`,
        handler: this.customerController.getCustomerById,
      },
      {
        method: 'POST',
        path: `${this._basePath}/`,
        handler: this.customerController.createNewCustomer,
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
