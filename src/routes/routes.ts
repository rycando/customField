import { inject, injectable } from 'tsyringe'
import { CustomerRouter } from '~/Customer'
import { CustomFieldRouter } from '~/CustomField'
import { OrderRouter } from '~/Order'
import { ProductRouter } from '~/Product'
import { StoreRouter } from '~/Store'

import * as Hapi from '@hapi/hapi'

export interface RouterIstance {
  routers: Hapi.ServerRoute[]
  basePath: string
}

@injectable()
export class Router {
  constructor(
    @inject('server') private readonly server: Hapi.Server,
    private readonly orderRouter: OrderRouter,
    private readonly customerRouter: CustomerRouter,
    private readonly productRouter: ProductRouter,
    private readonly storeRouter: StoreRouter,
    private readonly customFieldRouter: CustomFieldRouter
  ) {
    this.server.route([
      ...this.customerRouter.routers,
      ...this.orderRouter.routers,
      ...this.productRouter.routers,
      ...this.storeRouter.routers,
      ...this.customFieldRouter.routers,
    ])
  }
}
