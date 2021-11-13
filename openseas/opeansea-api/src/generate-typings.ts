/**
 * This project has Schema-first approach.
 * First define schema, after which TS Type defintions will be aitomagically generated
 */
import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path/posix';

const definitionFactory = new GraphQLDefinitionsFactory();

definitionFactory.generate({
  path: join('./src/**/*.graphql'), // Desitnition for type definitions
  typePaths: ['./**/*.graphql'], // Regex for filepath where graphql schema will be stored
  outputAs: 'class',
  watch: true,
});
