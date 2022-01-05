import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  path: join(process.cwd(), 'src/graphql.ts'), // Desitnition for type definitions
  typePaths: ['./src/**/*.graphql'], // Regex for filepath where graphql schema will be stored
  outputAs: 'class',
  watch: true,
});
