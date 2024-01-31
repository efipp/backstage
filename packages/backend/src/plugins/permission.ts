import {
  PluginIdProvider,
  PolicyBuilder,
} from '@janus-idp/backstage-plugin-rbac-backend';

import { createRouter } from '@backstage/plugin-permission-backend';
import {
  AuthorizeResult,
  PolicyDecision,
} from '@backstage/plugin-permission-common';
import { PermissionPolicy } from '@backstage/plugin-permission-node';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

class TestPermissionPolicy implements PermissionPolicy {
  async handle(): Promise<PolicyDecision> {
    return { result: AuthorizeResult.ALLOW };
  }
}

//export default async function createPlugin(
//  env: PluginEnvironment,
//): Promise<Router> {
//  return await createRouter({
//    config: env.config,
//    logger: env.logger,
//    discovery: env.discovery,
//    policy: new TestPermissionPolicy(),
//    identity: env.identity,
//  });
//}
export default async function createPlugin(
  env: PluginEnvironment,
  pluginIdProvider: PluginIdProvider,
): Promise<Router> {
  return PolicyBuilder.build(
    {
      config: env.config,
      logger: env.logger,
      discovery: env.discovery,
      identity: env.identity,
      permissions: env.permissions,
      tokenManager: env.tokenManager,
    },
    pluginIdProvider,
  );
}