import { delay, inject, injectable } from 'tsyringe'
import { OrderTransition } from '~/libraries/OrderStateMachine'
import { createOrderDTO, createOrderSchema, OrderService } from '~/Order'
import logger from '~/tools/logger'

import { Request, ResponseToolkit } from '@hapi/hapi'

@injectable()
export class OrderController {
  constructor(
    @inject(delay(() => OrderService))
    private readonly orderService: OrderService
  ) {}

  /////////////////////////////READ/////////////////////////////

  /**
   * 모든 주문을 가져옵니다
   * @param req
   * @param h
   * @returns OrderDTO[]
   */
  getAllOrders = async (req: Request, h: ResponseToolkit) => {
    return h.response(await this.orderService.getAllOrders()).code(200)
  }

  /**
   * ID에 해당하는 주문을 가져옵니다
   * @param req
   * @param h
   * @returns OrderDTO
   */
  getOrderById = async (req: Request, h: ResponseToolkit) => {
    return h.response(
      (await this.orderService.getOrderById(req.params.id)) ?? undefined
    )
  }

  /**
   * 스토어의 모든 주문을 가져옵니다
   * @param req
   * @param h
   * @returns OrderDTO[]
   */
  getStoreOrders = async (req: Request, h: ResponseToolkit) => {
    try {
      return h
        .response(await this.orderService.getOrdersByStoreId(req.params.id))
        .code(200)
    } catch (e) {
      console.log(e)
    }
  }

  /////////////////////////////READ/////////////////////////////

  ////////////////////////////CREATE////////////////////////////

  /**
   * 새로운 주문을 생성합니다
   * @param req
   * @param h
   * @returns OrderDTO
   */
  createNewOrder = async (req: Request, h: ResponseToolkit) => {
    return createOrderSchema
      .validate(req.payload)
      .then(async (payload) => {
        return this.orderService
          .createNewOrder(payload as createOrderDTO)
          .then((newOrder) => {
            return h.response(newOrder).code(201)
          })
          .catch((err: Error) => {
            logger.info(`Log 247: ${err}`)
            return h.response(err.message).code(400)
          })
      })
      .catch((err: Error) => {
        logger.info(`Log 7725: createOrderSchema validation Failed - ${err}`)

        return h
          .response(`createOrderSchema validation Failed: ${err.message}`)
          .code(400)
      })
  }

  ////////////////////////////CREATE////////////////////////////

  ////////////////////////////UPDATE////////////////////////////

  /**
   * 주문 상태를 결제 완료로 변경합니다
   * @param req
   * @param h
   * @returns OrderDTO
   */
  confirmOrder = async (req: Request, h: ResponseToolkit) => {
    return this.orderService
      .changeStatus(req.params.id, OrderTransition.Confirm)
      .then((updatedOrder) => {
        return updatedOrder
          ? h.response(updatedOrder).code(200)
          : h.response('correspond Order Not found').code(404)
      })
      .catch((err: Error) => {
        return h.response(err.message).code(400)
      })
  }

  /**
   * 주문 상태를 고객 취소로 변경합니다
   * @param req
   * @param h
   * @returns OrderDTO
   */
  cancelOrder = async (req: Request, h: ResponseToolkit) => {
    return this.orderService
      .changeStatus(req.params.id, OrderTransition.Cancel)
      .then((updatedOrder) => {
        return updatedOrder
          ? h.response(updatedOrder).code(200)
          : h.response('correspond Order Not found').code(404)
      })
      .catch((err: Error) => {
        return h.response(err.message).code(400)
      })
  }

  /**
   * 주문 상태를 환불로 변경합니다
   * @param req
   * @param h
   * @returns OrderDTO
   */
  refundOrder = async (req: Request, h: ResponseToolkit) => {
    return this.orderService
      .changeStatus(req.params.id, OrderTransition.Refund)
      .then((updatedOrder) => {
        return updatedOrder
          ? h.response(updatedOrder).code(200)
          : h.response('correspond Order Not found').code(404)
      })
      .catch((err: Error) => {
        return h.response(err.message).code(400)
      })
  }

  /**
   * 주문 상태를 상품 준비 중으로 변경합니다
   * @param req
   * @param h
   * @returns OrderDTO
   */
  prepare = async (req: Request, h: ResponseToolkit) => {
    return this.orderService
      .changeStatus(req.params.id, OrderTransition.Prepare)
      .then((updatedOrder) => {
        return updatedOrder
          ? h.response(updatedOrder).code(200)
          : h.response('correspond Order Not found').code(404)
      })
      .catch((err: Error) => {
        return h.response(err.message).code(400)
      })
  }

  /**
   * 주문 상태를 배송 준비 완료로 변경합니다
   * @param req
   * @param h
   * @returns OrderDTO
   */
  send = async (req: Request, h: ResponseToolkit) => {
    return this.orderService
      .changeStatus(req.params.id, OrderTransition.Send)
      .then((updatedOrder) => {
        return updatedOrder
          ? h.response(updatedOrder).code(200)
          : h.response('correspond Order Not found').code(404)
      })
      .catch((err: Error) => {
        return h.response(err.message).code(400)
      })
  }

  /**
   * 주문 상태를 배송 중으로 변경합니다
   * @param req
   * @param h
   * @returns OrderDTO
   */
  startDeliver = async (req: Request, h: ResponseToolkit) => {
    return this.orderService
      .changeStatus(req.params.id, OrderTransition.StartDeliver)
      .then((updatedOrder) => {
        return updatedOrder
          ? h.response(updatedOrder).code(200)
          : h.response('correspond Order Not found').code(404)
      })
      .catch((err: Error) => {
        return h.response(err.message).code(400)
      })
  }

  /**
   * 주문 상태를 배송 완료로 변경합니다
   * @param req
   * @param h
   * @returns OrderDTO
   */
  arrive = async (req: Request, h: ResponseToolkit) => {
    return this.orderService
      .changeStatus(req.params.id, OrderTransition.Arrive)
      .then((updatedOrder) => {
        return updatedOrder
          ? h.response(updatedOrder).code(200)
          : h.response('correspond Order Not found').code(404)
      })
      .catch((err: Error) => {
        return h.response(err.message).code(400)
      })
  }

  ////////////////////////////UPDATE////////////////////////////

  ////////////////////////////DELETE////////////////////////////

  ////////////////////////////DELETE////////////////////////////
}
