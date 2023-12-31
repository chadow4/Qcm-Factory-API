import {IsEmail, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Role} from '../auth/interface/role.enum';
import {QuestionnaireDto, QuestionnairePartialDto} from '../questionnaire/questionnaire.dto';
import {ResultDto, ResultPartialDto, ResultPartialForUserDto} from "../result/result.dto";
import {ModuleEntity} from "../module/module.entity";

export class UserCreateDto {
    @ApiProperty({description: 'First name of the user'})
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({description: 'Last name of the user'})
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({description: 'Email of the user'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'Password of the user'})
    @IsNotEmpty()
    password: string;
}

export class UserUpdateDto {
    @ApiProperty({description: 'First name of the user'})
    firstname?: string;

    @ApiProperty({description: 'Last name of the user'})
    lastname?: string;

    @ApiProperty({description: 'Email of the user'})
    @IsEmail()
    email?: string;

    @ApiProperty({description: 'Password of the user'})
    password?: string;
}

export class UserDeleteDto {
    @ApiProperty({description: 'ID of the user to delete'})
    @IsNotEmpty()
    id: number;
}

export class UserLoginDto {
    @ApiProperty({description: 'Email of the user'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'Password of the user'})
    @IsNotEmpty()
    password: string;
}

export class UserDto {
    @ApiProperty({description: 'ID of the user'})
    @IsNotEmpty()
    id: number;

    @ApiProperty({description: 'First name of the user'})
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({description: 'Last name of the user'})
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({description: 'Email of the user'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'Role of the user'})
    @IsNotEmpty()
    role: Role;

    @ApiProperty({type: () => [ModuleEntity], description: 'List of questionnaires created by the user'})
    myModules: ModuleEntity[];

    @ApiProperty({type: () => [ResultDto], description: 'List of results of the user'})
    myResults: ResultDto[];
}


export class UserPartialDto {
    @ApiProperty({description: 'ID of the user'})
    @IsNotEmpty()
    id: number;

    @ApiProperty({description: 'First name of the user'})
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({description: 'Last name of the user'})
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({description: 'Email of the user'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'Role of the user'})
    @IsNotEmpty()
    role: Role;
}