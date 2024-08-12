import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async onModuleInit() {
    if (process.env.NODE_ENV === 'development') {
      // Elimina todas las tablas
      await this.connection.dropDatabase();
      
      // Vuelve a crear todas las tablas
      await this.connection.synchronize(true);
      
      console.log('Base de datos reiniciada.');
    }
  }
}