import { AsyncLocalStorage } from 'async_hooks';

export interface TenantStore {
  tenantId: string;
}

export const tenantLocalStorage = new AsyncLocalStorage<TenantStore>();

export class TenantContext {
  static get tenantId(): string | undefined {
    return tenantLocalStorage.getStore()?.tenantId;
  }
}
