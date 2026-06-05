import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tenantLocalStorage } from './tenant.context';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // Fallback extract if TenantGuard didn't run or wasn't applied
    let tenantId = 
      request.tenantId || 
      request.user?.tenantId || 
      request.user?.tenant_id || 
      request.headers['x-tenant-id'] || 
      request.headers['x-tenant-id'.toLowerCase()];

    if (Array.isArray(tenantId)) {
      tenantId = tenantId[0];
    }

    if (tenantId) {
      request.tenantId = tenantId;
      
      return new Observable((subscriber) => {
        tenantLocalStorage.run({ tenantId }, () => {
          next.handle().subscribe(subscriber);
        });
      });
    }

    return next.handle();
  }
}
