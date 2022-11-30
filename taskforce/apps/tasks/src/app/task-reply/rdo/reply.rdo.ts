import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReplyRdo {
  @ApiProperty({
    description: 'Reply ID',
    example: '5d77e338-a4c0-47f9-ab5f-08c62ed7909e'
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
    example: '51599d01-9abe-4794-9345-ec720c70f042'
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
