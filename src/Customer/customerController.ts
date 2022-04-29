import { delay, inject, injectable } from 'tsyringe'
import {
  createCustomerDTO,
  createCustomerSchema,
  CustomerService,
} from '~/Customer'
import logger from '~/tools/logger'

import { Request, ResponseToolkit } from '@hapi/hapi'

@injectable()
export class CustomerController {
  constructor(
    @inject(delay(() => CustomerService))
    private readonly customerService: CustomerService
  ) {}

  /////////////////////////////READ/////////////////////////////

  /**
   * 모든 고객을 가져옵니다
   * @param req
   * @param h
   * @returns UserDTO[]
   */
  getAllCustomers = async (req: Request, h: ResponseToolkit) => {
    return h.response(await this.customerService.getAllCustomers()).code(200)
  }

  /**
   * ID에 해당하는 유저를 가져옵니다
   * @param req
   * @param h
   * @returns UserDTO
   */
  getCustomerById = async (req: Request, h: ResponseToolkit) => {
    return h.response(
      (await this.customerService.getCustomerById(req.params.id)) ?? undefined
    )
  }

  /**
   * 스토어의 고객을 모두 가져옵니다
   * @param req
   * @param h
   * @returns UserDTO[]
   */
  getStoreCustomers = async (req: Request, h: ResponseToolkit) => {
    return h
      .response(await this.customerService.getCustomersByStoreId(req.params.id))
      .code(200)
  }

  /////////////////////////////READ/////////////////////////////

  ////////////////////////////CREATE////////////////////////////

  /**
   * 새로운 고객을 생성합니다
   * @param req
   * @param h
   * @returns UserDTO[]
   */
  createNewCustomer = async (req: Request, h: ResponseToolkit) => {
    return createCustomerSchema
      .validate(req.payload)
      .then(async (payload: unknown) => {
        return this.customerService
          .createNewCustomer(payload as createCustomerDTO)
          .then((newCustomer) => {
            return h.response(newCustomer).code(201)
          })
          .catch((err: Error) => {
            logger.info(`Log 58387: ${err}`)
            return h.response(err.message).code(400)
          })
      })
      .catch((err) => {
        logger.info(
          `Log 48709: createCustomerSchema validation Failed - ${err}`
        )

        return h.response('createCustomerSchema validation Failed').code(400)
      })
  }

  ////////////////////////////CREATE////////////////////////////
}
