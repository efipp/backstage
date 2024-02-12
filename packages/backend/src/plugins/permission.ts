import { createRouter } from '@backstage/plugin-permission-backend';
import { Router } from 'express-serve-static-core';
import { PluginEnvironment } from '../types';
import { BackstageIdentityResponse } from '@backstage/plugin-auth-node';
import {
  PermissionPolicy,
  PolicyQuery,
} from '@backstage/plugin-permission-node';
import { PolicyDecision } from '@backstage/plugin-permission-common';
import {
  OpaClient,
  policyEvaluator,
} from '@parsifal-m/plugin-permission-backend-module-opa-wrapper';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const opaClient = new OpaClient(env.config, env.logger);

  const opaRbacPolicy = policyEvaluator(opaClient, env.logger);

  class OpaPermissionPolicy implements PermissionPolicy {
    async handle(
      request: PolicyQuery,
      user?: BackstageIdentityResponse,
    ): Promise<PolicyDecision> {
      return await opaRbacPolicy(request, user);
    }
  }

  return await createRouter({
    config: env.config,
    logger: env.logger,
    discovery: env.discovery,
    policy: new OpaPermissionPolicy(),
    identity: env.identity,
  });
}