import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import { EnvValidationMessage } from './app.constant';

const MIN_PORT = 0;
const MAX_PORT = 65535;

class EnvironmentConfig {
  @IsString({
    message: EnvValidationMessage.DBNameRequired,
  })
  public MONGO_DB: string;

  @IsString({
    message: EnvValidationMessage.DBHostRequired,
  })
  public MONGO_HOST: string;

  @IsNumber(
    {},
    {
      message: EnvValidationMessage.DBPasswordRequired,
    }
  )
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public MONGO_PORT: number;

  @IsString({
    message: EnvValidationMessage.DBUserRequired,
  })
  public MONGO_USER: string;

  @IsString({
    message: EnvValidationMessage.DBPasswordRequired,
  })
  public MONGO_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.DBBaseAuthRequired,
  })
  public MONGO_AUTH_BASE: string;

  @IsString({
    message: EnvValidationMessage.RMQHostRequired,
  })
  public RABBIT_USER: string;

  @IsString({
    message: EnvValidationMessage.RMQUserRequired,
  })
  public RABBIT_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.RMQHostRequired,
  })
  public RABBIT_HOST: string;

  @IsString({
    message: EnvValidationMessage.RMQSubscriberQueue,
  })
  public RABBIT_NOTIFY_SERVICE_QUEUE: string;

  @IsString({
    message: EnvValidationMessage.MailServerHostRequired,
  })
  public MAIL_SMTP_HOST: string;

  @IsNumber(
    {},
    {
      message: EnvValidationMessage.MailServerPortRequired,
    }
  )
  public MAIL_SMTP_PORT: number;

  @IsString({
    message: EnvValidationMessage.MailServerUserNameRequired,
  })
  public MAIL_USER_NAME: string;

  @IsString({
    message: EnvValidationMessage.MailServerPasswordRequired,
  })
  public MAIL_USER_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.MailServerDefaultFromRequired,
  })
  public MAIL_FROM: string;
}

export function validateEnvironment(config: Record<string, unknown>) {
  const environmentConfig = plainToInstance(EnvironmentConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(environmentConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentConfig;
}
