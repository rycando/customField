import { delay, inject, injectable } from 'tsyringe'
import { CustomerService } from '~/Customer'
import {
  createCustomFieldSchema,
  CustomFieldService,
  updateCustomFieldSchema,
} from '~/CustomField'
import { OrderService } from '~/Order'
import { ProductService } from '~/Product'
import logger from '~/tools/logger'

import { Request, ResponseToolkit } from '@hapi/hapi'

@injectable()
export class CustomFieldController {
  constructor(
    @inject(delay(() => CustomFieldService))
    private readonly customFieldService: CustomFieldService,
    @inject(delay(() => CustomerService))
    private readonly customerService: CustomerService,
    @inject(delay(() => OrderService))
    private readonly orderService: OrderService,
    @inject(delay(() => ProductService))
    private readonly productService: ProductService
  ) {}

  /////////////////////////////READ/////////////////////////////

  /**
   * 모든 사용자 정의 필드를 가져옵니다
   * @param req
   * @param h
   * @returns DocumentCustomerField[]
   */
  getAllCustomFields = async (req: Request, h: ResponseToolkit) => {
    return h
      .response(await this.customFieldService.getAllCustomFields())
      .code(200)
  }

  /**
   * ID에 해당하는 사용자 정의 필드를 가져옵니다
   * @param req
   * @param h
   * @returns DocumentCustomerField | undefined
   */
  getCustomFieldById = async (req: Request, h: ResponseToolkit) => {
    return h.response(
      (await this.customFieldService.getCustomFieldById(req.params.id)) ??
        undefined
    )
  }

  /////////////////////////////READ/////////////////////////////

  ////////////////////////////CREATE////////////////////////////
  /**
   * 사용자 정의 필드를 생성합니다
   * @param req
   * @param h
   * @returns DocumentCustomerField
   */
  createNewCustomField = async (req: Request, h: ResponseToolkit) => {
    return createCustomFieldSchema
      .validate(req.payload)
      .then(async () => {
        return h
          .response(
            await this.customFieldService.createNewCustomField(req.payload)
          )
          .code(201)
      })
      .catch((err: Error) => {
        logger.info(
          `Log 7725: createCustomFieldSchema validation Failed - ${err}`
        )

        return h
          .response(`createCustomFieldSchema validation Failed: ${err.message}`)
          .code(400)
      })
  }
  ////////////////////////////CREATE////////////////////////////

  ////////////////////////////UPDATE////////////////////////////

  /**
   * ID에 해당하는 사용자 정의 필드를 업데이트 합니다.
   * 필드 이름과 필수 입력 여부만 업데이트 될 수 있습니다.
   * @param req
   * @param h
   * @returns DocumentCustomerField
   */
  updateCustomField = async (req: Request, h: ResponseToolkit) => {
    return updateCustomFieldSchema
      .validate(req.payload)
      .then(async () => {
        const updatedCustomField =
          await this.customFieldService.updateNewCustomField(
            req.params.id,
            req.payload
          )

        return updatedCustomField
          ? h.response(updatedCustomField).code(200)
          : h.response('corresponding customField not found').code(404)
      })
      .catch((err) => {
        logger.info(
          `Log 17575: updateCustomFieldSchema validation Failed - ${err}`
        )

        return h.response('updateCustomFieldSchema validation Failed').code(400)
      })
  }

  ////////////////////////////UPDATE////////////////////////////

  ////////////////////////////DELETE////////////////////////////

  /**
   * ID에 해당하는 사용자 정의 필드를 삭제합니다
   * @param req
   * @param h
   * @returns DocumentCustomerField
   */
  deleteCustomField = async (req: Request, h: ResponseToolkit) => {
    const deletedCustomField = await this.customFieldService.deleteCustomField(
      req.params.id
    )

    if (!deletedCustomField) {
      return h.response('corresponding customField not found').code(404)
    }

    return h.response(deletedCustomField).code(200)
  }

  ////////////////////////////DELETE////////////////////////////
}
