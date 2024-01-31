# [Backstage](https://backstage.io)

This is your newly scaffolded Backstage App, Good Luck!

To start the app, run:

```sh
yarn install
yarn dev
```

## Env variables needed:
```sh
# export BACKSTAGE_URL=http://127.0.0.1
# export GITHUB_TOKEN=xyz (personal user token, used to publish repos from skaffold)
export AUTH_GITHUB_CLIENT_ID=xyz (client app, used for authorizing login)
export AUTH_GITHUB_CLIENT_SECRET=xyz (client app, used for authorizing login)
export BACKEND_SECRET=xyz (b64 encoded secret for signing service-to-service tokens)
# export TECHDOCS_AZURE_BLOB_STORAGE_CONTAINER_NAME=xyz 
# export TECHDOCS_AZURE_BLOB_STORAGE_ACCOUNT_NAME=xyz
# export TECHDOCS_AZURE_BLOB_STORAGE_ACCOUNT_KEY=xyz (Blob storage credentials and container name)
# export GITHUB_ORG_URL=https://github.com/xyz (GitHub organization url, e.g. tanuuidp)
# export ADMIN_TEAM_NAME=default/xyz (Admin-team name in GitHub, e.g. "default/admin". See more below)

# Commented variables are not currently used in this setup
```

## Building with Docker

To build the docker image run:
```sh
yarn install
yarn tsc
yarn build:backend --config ../../app-config.yaml
docker image build --platform linux/arm64,linux/amd64 --push \
  . -f packages/backend/Dockerfile --tag <version>
```

Then to run the container:
```sh
docker run -it -p 7007:7007 <version>
```

The application should be accessible in http://localhost:7007
