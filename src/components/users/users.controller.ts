import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  UseGuards,
  Request,
  Res,
  HttpStatus,
  Patch,
  Param,
  Body,
  Get,
  Delete,
} from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UsersService } from './users.service';
import * as fs from 'fs';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSerializer } from './user.serializer';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthService } from '../auth/auth.service';

const generateFileName = (req, file, callback) => {
  // Generate a unique file name or use any logic you prefer
  const uniqueName = Date.now().toString();
  const extension = extname(file.originalname);
  callback(null, `${uniqueName}${extension}`);
};

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async findOne(@Request() req, @Res() res: Response): Promise<Response> {
    const idByJwt = req.user.payload.id;

    let user = await this.usersService.findOneById(+idByJwt);
    if (user)
      return res.status(HttpStatus.OK).json(UserSerializer.serialize(user));
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ error: 'This User no longer exist or has been removed' });

    // if (idByJwt.toString() !== id) {
    //   return res.status(HttpStatus.FORBIDDEN).json({
    //     message: 'You cant consult information of other users by this way :)',
    //   });
    // } else {
    // }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateProfile')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
    @Res() res: Response,
  ) {
    const idByJwt = req.user.payload.id;
    const response = await this.usersService.update(+idByJwt, {
      firstname: updateUserDto.firstname,
      lastname: updateUserDto.lastname,
      birthdate: updateUserDto.birthdate,
    });
    if (response)
      return res
        .status(HttpStatus.OK)
        .json({ message: 'User information updated successfully' });
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ error: 'The User to be updated no longer exist' });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('changePassword')
  async changePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Request() req,
    @Res() res: Response,
  ) {
    const idByJwt = req.user.payload.id;
    let user = await this.usersService.findOneById(+idByJwt);
    if (user) {
      const currentStoredPassword = user.password;
      const sentOldPassword = updatePasswordDto.oldPassword;

      const newPassword = updatePasswordDto.newPassword;
      // const confirmNewPassword = updatePasswordDto.confirmNewPassword;
      const isOk = await this.authService.changePassword(
        idByJwt,
        sentOldPassword,
        currentStoredPassword,
        newPassword,
      );
      if (isOk) {
        return res
          .status(HttpStatus.OK)
          .json({ message: 'Password changed successfully' });
      } else {
        return res.status(HttpStatus.FORBIDDEN).json({
          error: 'Password incorrect or something else went wrong',
        });
      }
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'The User to be updated no longer exist' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('changePhoto')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './profile-images',
        filename: generateFileName,
      }),
    }),
  )
  async uploadFile(
    @Request() req,
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // TO DO, DONT DELETE THIS COMMENT TO REMEMBER TO ADD THE VALIDATION BY FILE TYPE
          // new MaxFileSizeValidator({ maxSize: 1000000 }),
          // new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    MulterModule.register({
      dest: './profile-images',
    });

    const fileName = file.filename;

    console.log(req.user);
    const id = req.user.payload.id;

    let user = await this.usersService.findOneById(+id);
    const profileImageFileName = user.profileImageFileName;

    if (profileImageFileName) {
      const filePath = `./profile-images/${profileImageFileName}`;

      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.log('error while deleting current photo');
      }
    }

    ////////////////////////////////
    const response = await this.usersService.update(+id, {
      profileImageFileName: fileName,
    });

    if (response)
      return res
        .status(HttpStatus.OK)
        .json({ message: 'User Image updated successfully' });
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ error: 'The User cannot be updated' });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deletePhoto')
  async deleteFile(@Request() req, @Res() res: Response) {
    const idByJwt = req.user.payload.id;

    let user = await this.usersService.findOneById(+idByJwt);
    const profileImageFileName = user.profileImageFileName;
    if (!profileImageFileName) {
      return res
        .status(HttpStatus.OK)
        .json({ message: 'You dont have profile image' });
    }
    const filePath = `./profile-images/${profileImageFileName}`;

    try {
      fs.unlinkSync(filePath);
      const response = await this.usersService.update(+idByJwt, {
        profileImageFileName: null,
      });
      if (response) {
        return res
          .status(HttpStatus.OK)
          .json({ message: 'User Image deleted successfully' });
      } else {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: 'Something went wrong' });
      }
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Cannot delete image, please try again or contact us' });
    }
  }
}
