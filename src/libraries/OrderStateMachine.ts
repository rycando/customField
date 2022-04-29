import StateMachine from 'javascript-state-machine'
import { delay, inject, injectable } from 'tsyringe'
import { OrderStatus } from '~/base'
import { DocumentOrder, OrderRepository } from '~/Order'

/**
 * 주문 상태 변경 transition 종류
 */
export enum OrderTransition {
  /** 주문 확인 */
  Confirm = 'confirm',

  /** 주문 취소 */
  Cancel = 'cancel',

  /** 주문 환불 */
  Refund = 'refund',

  /** 상품 준비 */
  Prepare = 'prepare',

  /** 상품 발송 */
  Send = 'send',

  /** 배송 시작 */
  StartDeliver = 'startDeliver',

  /** 배송 도착 */
  Arrive = 'arrive',
}

/**
 * 주문 상태 변경 transition 정의
 */
export const transitions = [
  {
    name: OrderTransition.Confirm,
    from: OrderStatus.PENDING,
    to: OrderStatus.CONFIRMED,
  },
  {
    name: OrderTransition.Cancel,
    from: [
      OrderStatus.PENDING,
      OrderStatus.CONFIRMED,
      OrderStatus.PRODUCT_PERPARING,
    ],
    to: OrderStatus.CANCELED,
  },
  {
    name: OrderTransition.Refund,
    from: [
      OrderStatus.PENDING,
      OrderStatus.CONFIRMED,
      OrderStatus.PRODUCT_PERPARING,
      OrderStatus.DELIVER_COMPLETE,
    ],
    to: OrderStatus.REFUNDED,
  },
  {
    name: OrderTransition.Prepare,
    from: OrderStatus.CONFIRMED,
    to: OrderStatus.PRODUCT_PERPARING,
  },
  {
    name: OrderTransition.Send,
    from: OrderStatus.PRODUCT_PERPARING,
    to: OrderStatus.READY_TO_DELIVER,
  },
  {
    name: OrderTransition.StartDeliver,
    from: OrderStatus.READY_TO_DELIVER,
    to: OrderStatus.DELIVERING,
  },
  {
    name: OrderTransition.Arrive,
    from: OrderStatus.DELIVERING,
    to: OrderStatus.DELIVER_COMPLETE,
  },
]

/**
 * 주문 상태를 변화 시키는 State-Machine
 */
@injectable()
export class OrderStateMachine {
  constructor(
    @inject(delay(() => OrderRepository))
    private readonly orderRepository: OrderRepository
  ) {}

  private transitionMethods(order: DocumentOrder) {
    return {
      async onConfirm() {},
      async onCancel() {},
      async onRefund() {},
      async onPrepare() {},
      async onSend() {},
      async onStartDeliver() {},
      async onArrive() {},
    }
  }

  public changeState = async ({
    order,
    transition,
  }: {
    order: DocumentOrder
    transition: OrderTransition
  }) => {
    const fsm = new StateMachine({
      init: order.status,
      transitions,
      methods: this.transitionMethods(order),
    })

    await fsm[transition]?.()

    const updatedOrder = await this.orderRepository.findOneAndUpdate(
      order._id,
      {
        status: fsm.state,
      }
    )

    if (!updatedOrder) {
      throw new Error('Error 60809: 상태 변경에 실패했습니다.')
    }

    return updatedOrder!
  }

  /**
   * 상태 변경 가능 여부
   * @param from
   * @param to
   * @returns boolean
   */
  can(from: OrderStatus, to: OrderStatus) {
    const fsm = new StateMachine({
      init: from,
      transitions,
    })

    return fsm.can(to)
  }

  /**
   * 상태 변경 불가능 여부
   * @param from
   * @param to
   * @returns boolean
   */
  cannot(from: OrderStatus, to: OrderStatus) {
    const fsm = new StateMachine({
      init: from,
      transitions,
    })

    return fsm.cannot(to)
  }
}
