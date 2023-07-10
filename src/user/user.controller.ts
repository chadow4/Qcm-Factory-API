import { Body, Controller, Delete, Get, HttpException, Param, Put, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserUpdateDto } from "./user.dto";
import { HasRoles } from "../auth/has-roles.decorator";
import { Role } from "../auth/interface/role.enum";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";

@Controller("user")
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get()
  @UseGuards(AuthGuard("jwt"),RolesGuard)
  async showAllUsers() {
    try {
      return await this.userService.showAllUsers();
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message
      };
    }
  }

  @Get('myinfos')
  @UseGuards(AuthGuard("jwt"))
  async getMyInfo(@Request() req) {
    try {
      return await this.userService.findOneById(req.user.id);
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message
      };
    }
  }

  @Get(":id")
  @HasRoles(Role.Prof)
  @UseGuards(AuthGuard("jwt"),RolesGuard)
  async findOneById(@Param("id") id: number) {
    try {
      return await this.userService.findOneById(id);
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message
      };
    }
  }


  @Put()
  @UseGuards(AuthGuard("jwt"))
  async updateUser(@Request() req, @Body() userUpdateDto: UserUpdateDto) {
    try {
      return await this.userService.updateUser(req.user.id, userUpdateDto);
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message
      };
    }
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  async deleteUser(@Param("id") id: number) {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      if (error instanceof HttpException) {
        return {
          statusCode: error.getStatus(),
          message: error.message
        };
      }
    }

  }
}

