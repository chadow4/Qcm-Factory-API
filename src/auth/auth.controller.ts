import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegistrationStatus } from "./interface/registration-status.interface";
import { LoginStatus } from "./interface/login-status.interface";
import { UserCreateDto, UserLoginDto } from "../user/user.dto";


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("register")
  public async register(@Body() createUserDto: UserCreateDto): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post("login")
  public async login(@Body() loginUserDto: UserLoginDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }
}