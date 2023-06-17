import { IsString, Length, IsDateString } from 'class-validator';
export class CreateEventDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  @Length(3, 255)
  description: string;

  @IsDateString()
  when: string;

  @Length(4, 255)
  address: string;
}
