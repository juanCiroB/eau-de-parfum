import type { OrderRepository } from '@domain/repositories/OrderRepository';
import type { Order } from '@domain/entities/Order';

/**
 * Adaptador en memoria del puerto OrderRepository (FASE 2).
 * Existe para que el checkout futuro tenga dónde "guardar" pedidos durante
 * desarrollo, antes de conectar la base de datos real.
 */
export class InMemoryOrderRepository implements OrderRepository {
  private readonly store = new Map<string, Order>();

  async create(order: Order): Promise<Order> {
    this.store.set(order.id, order);
    return order;
  }

  async findById(id: string): Promise<Order | null> {
    return this.store.get(id) ?? null;
  }
}
