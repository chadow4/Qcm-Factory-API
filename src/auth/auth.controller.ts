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
  public async register(@Body() createUserDto: UserCreateDto) {
    try{
        await this.authService.register(createUserDto);
        return {
            message: "User registration successful"
        }
    }catch (error){
      return {
        message : error.message,
      }
    }
  }

  @Post("login")
  public async login(@Body() loginUserDto: UserLoginDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }
}