import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import { EnvValidationMessage, MAX_PORT, MIN_PORT } from './app.constants';
import { plainToInstance } from 'class-transformer';

class EnvironmentsConfig {
  @IsString({
    message: EnvValidationMessage.DBNameRequired
  })
  public MONGO_DB: string;

  @IsString({
    message: EnvValidationMessage.DBHostRequired
  })
  public MONGO_HOST: string;

  @IsNumber({}, {
    message: EnvValidationMessage.DBPortRequired
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public MONGO_PORT: number;

  @IsString({
    message: EnvValidationMessage.DBUserRequired
  })
  public MONGO_USER: string;

  @IsString({
    message: EnvValidationMessage.DBPasswordRequired
  })
  public MONGO_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.DBBaseAuthRequired
  })
  public MONGO_AUTH_BASE: string;
}

export const validateEnvironments = (config: Record<string, unknown>) => {
  const environmentsConfig = plainToInstance(
    EnvironmentsConfig,
    config,
    { enableImplicitConversion: true}
  );

  const errors = validateSync(
    environmentsConfig,
    { skipMissingProperties: false}
  );

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return environmentsConfig;
};
