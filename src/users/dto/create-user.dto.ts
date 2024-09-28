import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Define se usuário e administrador',
    default: false,
  })
  @IsBoolean()
  admin: boolean = false;
}
