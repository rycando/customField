import { delay, inject, injectable } from 'tsyringe'
import {
  createStoreDTO,
  createStoreSchema,
  StoreService,
  updateStoreDTO,
  updateStoreSchema,
} from '~/Store'
import logger from '~/tools/logger'

import { Request, ResponseToolkit } from '@hapi/hapi'

@injectable()
export class StoreController {
  constructor(
    @inject(delay(() => StoreService))
    private readonly storeService: StoreService
  ) {}

  /////////////////////////////READ/////////////////////////////

  /**
   * 모든 스토어 목록을 가져옵니다
   * @param req
   * @param h
   * @returns DocumentStore[]
   */
  getAllStores = async (req: Request, h: ResponseToolkit) => {
    return h.response(await this.storeService.getAllStores()).code(200)
  }

  /**
   * ID에 해당하는 스토어를 가져옵니다
   * @param req
   * @param h
   * @returns DocumentStore
   */
  getStoreById = async (req: Request, h: ResponseToolkit) => {
    return h.response(
      (await this.storeService.getStoreById(req.params.id)) ?? undefined
    )
  }

  /////////////////////////////READ/////////////////////////////

  ////////////////////////////CREATE////////////////////////////

  /**
   * 새로운 스토어를 생성합니다
   * @param req
   * @param h
   * @returns DocumentStore
   */
  createNewStore = async (req: Request, h: ResponseToolkit) => {
    return createStoreSchema
      .validate(req.payload)
      .then(async () => {
        return this.storeService
          .createNewStore(req.payload as createStoreDTO)
          .then((newStore) => {
            return h.response(newStore).code(201)
          })
          .catch((err: Error) => {
            logger.info(`Log 49995: ${err}`)
            return h.response(err.message).code(400)
          })
      })
      .catch((err) => {
        logger.info(`Log 43589: createStoreSchema validation Failed - ${err}`)

        return h.response('createStoreSchema validation Failed').code(400)
      })
  }

  ////////////////////////////CREATE////////////////////////////

  ////////////////////////////UPDATE////////////////////////////

  /**
   * 스토어 정보를 업데이트 합니다
   * @param req
   * @param h
   * @returns DocumentStore
   */
  updateStore = async (req: Request, h: ResponseToolkit) => {
    return updateStoreSchema
      .validate(req.payload)
      .then(async () => {
        return this.storeService
          .updateStore(req.params.id, req.payload as updateStoreDTO)
          .then((store) => {
            return h.response(store).code(200)
          })
          .catch((err: Error) => {
            logger.info(`Log 57666: ${err}`)
            return h.response(err.message).code(400)
          })
      })
      .catch((err) => {
        logger.info(`Log 11174: updateStoreSchema validation Failed - ${err}`)

        return h.response('updateStoreSchema validation Failed').code(400)
      })
  }

  ////////////////////////////CREATE////////////////////////////

  ////////////////////////////DELETE////////////////////////////

  ////////////////////////////DELETE////////////////////////////
}
