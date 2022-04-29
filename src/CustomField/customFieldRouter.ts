import { delay, inject, injectable } from 'tsyringe'
import { CustomFieldController } from '~/CustomField'
import { RouterIstance } from '~/routes'

import * as Hapi from '@hapi/hapi'

@injectable()
export class CustomFieldRouter implements RouterIstance {
  constructor(
    @inject(delay(() => CustomFieldController))
    private readonly customFieldController: CustomFieldController
  ) {
    this._basePath = '/customFields'

    this._routers = [
      {
        method: 'GET',
        path: `${this._basePath}/`,
        handler: this.customFieldController.getAllCustomFields,
      },
      {
        method: 'GET',
        path: `${this._basePath}/{id}`,
        handler: this.customFieldController.getCustomFieldById,
      },
      {
        method: 'POST',
        path: `${this._basePath}/`,
        handler: this.customFieldController.createNewCustomField,
      },
      {
        method: 'PUT',
        path: `${this._basePath}/{id}`,
        handler: this.customFieldController.updateCustomField,
      },
      {
        method: 'DELETE',
        path: `${this._basePath}/{id}`,
        handler: this.customFieldController.deleteCustomField,
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
