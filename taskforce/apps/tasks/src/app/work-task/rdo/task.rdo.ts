import { TaskStatus } from '@task-force/shared-types';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ReplyRdo } from '../../task-reply/rdo/reply.rdo';

export class TaskRdo {
  @ApiProperty({
    description: 'Address of the place where the task should be done',
    example: 'Центральный район',
  })
  @Expose()
  address: string;

  @ApiProperty({
    description: 'A budget of the task',
    example: '100',
  })
  @Expose()
  budget: number;

  @ApiProperty({
    description: 'Task client ID',
    example: '51599d01-9abe-4794-9345-ec720c70f042',
  })
  @Expose()
  clientId: string;

  @ApiProperty({
    description: 'Task client ID',
    example: '31e42365-5502-4238-9233-5b2fe994909f',
  })
  @Expose()
  contractorId: string;

  @ApiProperty({
    description: 'Task creation date',
    example: '2022-11-20T09:41:03.070Z',
  })
  @Expose()
  created: string;

  @ApiProperty({
    description: 'Task full description',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Task due date',
    example: '2022-11-30T09:17:04.013Z',
  })
  @Expose()
  dueDate: string;

  @ApiProperty({
    description: 'Task ID',
    example: '1',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'An image for the task',
    example: 'image.jpg',
  })
  @Expose()
  files: string[];

  @Expose()
  skills: string[];

  @Expose()
  status: TaskStatus;

  @ApiProperty({
    description: 'Task skills',
    example: ['Уборка'],
  })
  @Expose()
  tags: string[];

  @ApiProperty({
    description: 'Task replies',
    example: ['Уборка'],
  })
  @Expose()
  replies: ReplyRdo[];

  @ApiProperty({
    description: 'The essence of the task',
    example: 'Убрать квартиру после вписки',
  })
  @Expose()
  title: string;
}
