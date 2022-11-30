import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Address of the place where the task should be done',
    example: 'Центральный район'
  })
  address: string;

  @ApiProperty({
    description: 'A budget of the task',
    example: '100'
  })
  budget: number;

  @ApiProperty({
    description: 'Task client ID',
    example: '51599d01-9abe-4794-9345-ec720c70f042'
  })
  clientId: string;

  @ApiProperty({
    description: 'Task full description',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing'
  })
  description: string;

  @ApiProperty({
    description: 'Task due date',
    example: '2022-11-30T09:17:04.013Z'
  })
  dueDate: string;

  @ApiProperty({
    description: 'An image for the task',
    example: 'image.jpg'
  })
  image: string;

  @ApiProperty({
    description: 'Task skills',
    example: ['Уборка']
  })
  skills: string[];

  @ApiProperty({
    description: 'The essence of the task',
    example: 'Убрать квартиру после вписки'
  })
  title: string;
}
