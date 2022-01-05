import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonationsModule } from './donations/donations.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: false, // Apollo sandbox will be our sandbox
      plugins: [ApolloServerPluginLandingPageLocalDefault], // Apollo playground
      typePaths: ['./**/*.graphql'], // Regex for filepath where graphql schema will be stored
    }),
    DonationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
