import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import { EnvValidationMessage } from './app.constants';

enum Port {
  MIN = 0,
  MAX = 65535,
}

class EnvironmentsConfig {
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
      message: EnvValidationMessage.DBPortRequired,
    }
  )
  @Min(Port.MIN)
  @Max(Port.MAX)
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
}

export function validateEnvironment(config: Record<string, unknown>) {
  const environmentsConfig = plainToInstance(EnvironmentsConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(environmentsConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentsConfig;
}
