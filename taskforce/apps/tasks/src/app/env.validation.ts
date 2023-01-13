import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import { EnvValidationMessage } from './app.constants';

class EnvironmentConfig {
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
