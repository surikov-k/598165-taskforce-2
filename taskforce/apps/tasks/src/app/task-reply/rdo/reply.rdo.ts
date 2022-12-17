import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReplyRdo {
  @ApiProperty({
    description: 'Reply ID',
    example: '5'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User ID',
    example: '31e42365-5502-4238-9233-5b2fe994909f'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Task ID',
    example: '51'
  })
  @Expose()
  public taskId: string;

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
