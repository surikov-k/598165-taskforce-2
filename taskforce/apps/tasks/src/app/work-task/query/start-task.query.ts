import { IsMongoId } from 'class-validator';

export class StartTaskQuery {
  @IsMongoId()
  public contractorId: string;
}
