import { delay, inject, injectable } from 'tsyringe'
import {
  createProductDTO,
  createProductSchema,
  ProductService,
} from '~/Product'
import logger from '~/tools/logger'

import { Request, ResponseToolkit } from '@hapi/hapi'

@injectable()
export class ProductController {
  constructor(
    @inject(delay(() => ProductService))
    private readonly productService: ProductService
  ) {}

  /////////////////////////////READ/////////////////////////////

  /**
   * 모든 상품을 가져옵니다
   * @param req
   * @param h
   * @returns ProductDTO[]
   */
  getAllProducts = async (req: Request, h: ResponseToolkit) => {
    return h.response(await this.productService.getAllProducts()).code(200)
  }

  /**
   * ID에 해당하는 상품을 가져옵니다
   * @param req
   * @param h
   * @returns ProductDTO
   */
  getProductById = async (req: Request, h: ResponseToolkit) => {
    return h
      .response(
        (await this.productService.getProductById(req.params.id)) ?? undefined
      )
      .code(200)
  }

  /**
   * 스토어의 상품을 모두 가져옵니다
   * @param req
   * @param h
   * @returns ProductDTO
   */
  getStoreProducts = async (req: Request, h: ResponseToolkit) => {
    return h
      .response(await this.productService.getProdcutsByStoreId(req.params.id))
      .code(200)
  }

  /////////////////////////////READ/////////////////////////////

  ////////////////////////////CREATE////////////////////////////

  /**
   * 새로운 상품을 생성합니다
   * @param req
   * @param h
   * @returns ProductDTO
   */
  createNewProduct = async (req: Request, h: ResponseToolkit) => {
    return createProductSchema
      .validate(req.payload)
      .then(async (payload: unknown) => {
        return this.productService
          .createNewProduct(payload as createProductDTO)
          .then((newProduct) => {
            return h.response(newProduct).code(201)
          })
          .catch((err: Error) => {
            logger.info(`Log 59719: ${err}`)
            return h.response(err.message).code(400)
          })
      })
      .catch((err) => {
        logger.info(`Log 53288: createProductSchema validation Failed - ${err}`)

        return h.response('createProductSchema validation Failed').code(400)
      })
  }

  ////////////////////////////CREATE////////////////////////////
}
