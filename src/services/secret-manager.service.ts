import { Injectable } from '@nestjs/common';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';


@Injectable()
export class SecretManagerService {

  private client: any = null;

  constructor() {
    this.client = new SecretManagerServiceClient();
  }

  private async accessSecretVersion(secretName) {
    const [version] = await this.client.accessSecretVersion({ name: secretName });
    return version.payload.data;
  }

  settingCredentials(): Promise<any> {
    return new Promise(async (resolve, reject) => {
  
      const { CLOUD_SQL_CREDENTIALS_SECRET } = process.env;
      if (!CLOUD_SQL_CREDENTIALS_SECRET) {
        return reject(`Error getting env CLOUD_SQL_CREDENTIALS_SECRET`);
      }
  
      const secrets = await this.accessSecretVersion(CLOUD_SQL_CREDENTIALS_SECRET);
  
      try {
        process.env.DB_PASS = secrets.toString();
        return resolve(true);
      } catch (err) {
        err.message = `Unable to parse secret from Secret Manager. Make sure that the secret is JSON formatted: \n ${err.message} `;
        return reject(err);
      }
    });
  }
}


