import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Extract tenant_id from JWT payload (user object) or x-tenant-id header
    let tenantId = 
      request.user?.tenantId || 
      request.user?.tenant_id || 
      request.headers['x-tenant-id'] || 
      request.headers['x-tenant-id'.toLowerCase()];

    if (Array.isArray(tenantId)) {
      tenantId = tenantId[0];
    }

    if (tenantId) {
      request.tenantId = tenantId;
    }

    return true;
  }
}
