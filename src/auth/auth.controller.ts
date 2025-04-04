import { Body, Controller, HttpCode, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwtauthguard/jwtauthguard.guard';


interface CustomRequest extends Request {
  user?: any; 
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @Post('register')
    @HttpCode(201)
    public async register(@Body() data) {
        try {
            const response = await this.authService.register(data);
            return {
                message: response.message,
            };
        } catch (error) {
            throw new UnauthorizedException(error.message || 'Registration failed');
        }
    }
    
    @Post('login')
    @HttpCode(200)
    async login(@Body() data) {
        try {
            const response = await this.authService.login(data);
            return {
                message: 'Login successful',
                access_token: response.access_token,
            };
        } catch (error) {
            throw new UnauthorizedException(error.message || 'Login failed');
        }
    }

    @Post('profile')
    @UseGuards(JwtAuthGuard)
    public async getProfile(@Req() req: CustomRequest) {
        try {
            return {
                message: 'Profile accessed successfully',
                user: req.user,
            };
        } catch (error) {
            throw new UnauthorizedException('Failed to fetch profile');
        }
    }
}
