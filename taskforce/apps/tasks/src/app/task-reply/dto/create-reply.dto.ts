import { ApiProperty } from '@nestjs/swagger';

export class CreateReplyDto  {
  @ApiProperty({
    description: 'A budget of the task',
    example: '100'
  })
  budget: number;

  @ApiProperty({
    description: 'A text of the task reply',
    example: 'Могу сделать всё в лучшем виде. У меня есть необходимый опыт и инструменты.'
  })
  comment: string;

  @ApiProperty({
    description: 'Task ID',
    example: '5'
  })
  taskId: number;

  @ApiProperty({
    description: 'User ID',
    example: '31e42365-5502-4238-9233-5b2fe994909f'
  })
  userId: string;
}
