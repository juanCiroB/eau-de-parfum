import type { Order } from '@domain/entities/Order';

/**
 * Puerto del repositorio de pedidos. Sin implementación en el prototipo:
 * documenta el contrato que el checkout (fase 2) usará para persistir pedidos.
 */
export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
}
