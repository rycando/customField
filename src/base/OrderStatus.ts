/** 주문 상태 */
export enum OrderStatus {
  /**
   * 결제 대기 중
   */
  PENDING = 'PENDING',

  /**
   * 결제 완료
   */
  CONFIRMED = 'CONFIRMED',

  /**
   * 고객 취소
   */
  CANCELED = 'CANCELED',

  /**
   * 환불 (스토어 ONLY)
   */
  REFUNDED = 'REFUNDED',

  /**
   * 상품 준비 중
   */
  PRODUCT_PERPARING = 'PRODUCT_PERPARING',

  /**
   * 배송 준비 완료
   */
  READY_TO_DELIVER = 'READY_TO_DELIVER',

  /**
   * 배송 중
   */
  DELIVERING = 'DELIVERING',

  /**
   * 배송 완료
   */
  DELIVER_COMPLETE = 'DELIVER_COMPLETE',
}
