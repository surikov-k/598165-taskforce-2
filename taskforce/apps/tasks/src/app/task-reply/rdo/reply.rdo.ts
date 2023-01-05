import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReplyRdo {
  @ApiProperty({
    description: 'Reply ID',
    example: '5'
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'User ID',
    example: '638dac5ca3a0dafd519c1829'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Task ID',
    example: '51'
  })
  @Expose()
  public taskId: number;

  @ApiProperty({
    description: 'A text of the task reply',
    example: 'Могу сделать всё в лучшем виде. У меня есть необходимый опыт и инструменты.'
  })
  @Expose()
  public comment: string;

  @ApiProperty({
    description: 'A budget of the task',
    example: '100'
  })
  @Expose()
  public budget: number;
}
