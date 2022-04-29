import fs from 'fs'
import StateMachine from 'javascript-state-machine'
import visualize from 'javascript-state-machine/lib/visualize'
import { graphviz } from 'node-graphviz'
import { OrderStatus } from '~/base'
import { transitions } from '~/libraries/OrderStateMachine'

const fsm = new StateMachine({
  init: OrderStatus.PENDING,
  transitions,
})

graphviz.circo(visualize(fsm), 'svg').then((svg) => {
  fs.writeFileSync('OrderStateMachine.svg', svg)
  process.exit(0)
})
