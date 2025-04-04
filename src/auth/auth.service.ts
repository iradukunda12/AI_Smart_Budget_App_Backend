import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
      constructor(
       @InjectRepository(User)
    private userRepo: Repository<User>,
          private jwtService: JwtService,
     private configService: ConfigService, 
      ) { 
      }
  
  

  public async register(data: { name: string; email: string; password: string }): Promise<{ message: string }> { 
  try { 
    const exists = await this.userRepo.findOne({ where: { email: data.email } }); 
    if (exists) { 
      throw new ConflictException('User already exists'); 
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log('Hashed Password:', hashedPassword); 
    const user = this.userRepo.create({ name: data.name, email: data.email, password: hashedPassword });
    await this.userRepo.save(user);

    return { message: 'User registered' }; 
  } catch (error) { 
    if (error instanceof ConflictException) { 
      throw error; 
    }                     
    throw new InternalServerErrorException('Something went wrong while registering the user'); 
  } 
}

    
 public async login(data) {
    try {
      
      const user = await this.userRepo.findOne({ where: { email: data.email } });
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      
      const match = await bcrypt.compare(data.password, user.password);
      if (!match) {
        throw new UnauthorizedException('Invalid email or password');
      }

     
      const payload = { email: user.email, id: user.id };
      
     
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET
        }),
      };
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    }
  }



 public async validateUser(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
}
