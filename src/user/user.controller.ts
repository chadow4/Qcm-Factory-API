import { Body, Controller, Delete, Get, HttpException, Param, Put, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import {UserDto, UserPartialDto, UserUpdateDto} from "./user.dto";
import { HasRoles } from "../auth/has-roles.decorator";
import { Role } from "../auth/interface/role.enum";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";
import {ApiOkResponse, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('User')
@Controller("user")
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  @ApiOkResponse({ description: 'List of all users', type: UserPartialDto, isArray: true })
  async showAllUsers() {
    try {
      return await this.userService.showAllUsers();
    } catch (error) {
      return {
        message: error.message
      };
    }
  }

  @Get('myinfos')
  @UseGuards(AuthGuard("jwt"))
  @ApiOkResponse({ description: 'Information of the authenticated user', type: UserDto })
  async getMyInfo(@Request() req) {
    try {
      return await this.userService.findOneById(req.user.id);
    } catch (error) {
      return {
        message: error.message
      };
    }
  }

  @Get(":id")
  @HasRoles(Role.Prof)
  @UseGuards(AuthGuard("jwt"),RolesGuard)
  @ApiOkResponse({ description: 'Information of the user with the specified ID', type: UserDto })
  async findOneById(@Param("id") id: number) {
    try {
      return await this.userService.findOneById(id);
    } catch (error) {
      return {
        message: error.message
      };
    }
  }


  @Put()
  @UseGuards(AuthGuard("jwt"))
  @ApiOkResponse({description: 'User updated' })
  async updateUser(@Request() req, @Body() userUpdateDto: UserUpdateDto) {
    try {
      await this.userService.updateUser(req.user.id, userUpdateDto);
        return {
            message: "User updated",
        }
    } catch (error) {
      return {
        message: error.message
      };
    }
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiOkResponse({ description: 'User deleted' })
  async deleteUser(@Param("id") id: number) {
    try {
      await this.userService.deleteUser(id);
        return {
            message: "User deleted",
        }
    } catch (error) {
        return {
          message: error.message
        };
    }

  }
}

