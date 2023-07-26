import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Request,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {FileService} from "./file.service";
import {Express, Response} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {FileCreateDto} from "./file.dto";
import {HasRoles} from "../auth/has-roles.decorator";
import {Role} from "../auth/interface/role.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../auth/roles.guard";

@Controller("file")
export class FileController {
    constructor(private readonly fileService: FileService) {
    }

    @Post("upload")
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: "./uploads",
            filename: (req, file, cb,) => {
                const name = file.originalname.split('.')[0];
                const fileExtension = file.originalname.split('.')[1];
                const newFileName = name.split(" ").join('_') + '_' + Date.now() + '.' + fileExtension;

                cb(null, newFileName);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|csv|ods)$/)) {
                return cb(null, false);
            }
            cb(null, true);
        }
    }))
    upload(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File extension not allowed');
        } else {
            const response = {
                filePath: `http://localhost:3000/file/uploads/${file.filename}`
            };
            return response;
        }
    }

    @Get('uploads/:filename')
    async getFile(@Param('filename') filename, @Res() res: Response) {
        res.sendFile(filename, {root: 'uploads'});
    }

    @Post()
    @HasRoles(Role.Prof)
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    async createFile(@Body() file: FileCreateDto, @Request() req) {
        try {
            await this.fileService.createFile(file, req.user.id);
            return {message: "File uploaded"};
        } catch (error) {
            throw error;
        }
    }

    @Delete(":id")
    @HasRoles(Role.Prof)
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    async deleteFile(@Param("id") id: number, @Request() req) {
        try {
            await this.fileService.deleteFile(id, req.user.id);
            return {message: "File deleted successfully"};
        } catch (error) {
            throw error;
        }
    }


}
