# Cadastro básico usando NodeJS, Typescript, TypeORM, conceitos de SOLID, DDD e testes!!
- Este projeto é:
1. Baseado em uma arquitetura de modulos baseados em domínio e MVC.
2. Escrito em typescript para obter melhor resultado e para usar tipagens no javascript.
3. Feito utilizando conceitos de SOLID.
4. Testado com jest com um coverage unitário de 100% nos serviços (até onde se sabe xD) para evitar problemas de regra de negócio.

## Para rodar em mod de desenvolvimento
Ajustar o ormconfig.example.json para um ormconfig.json, apontando para src e trocando .js por .ts
Em seguida:
```yarn dev```

## Para gerar uma build
```yarn build```

## Para rodar a build
Ajustar o ormconfig.example.json para um ormconfig.json, apontando para dist e trocando .ts por .js
Em seguida:
```yarn start```

## Para rodar os testes unitários
```yarn test```

## Para rodar os testes unitários
Ajustar o ormconfig.example.json para um ormconfig.json e, em seguida:
```yarn typeorm migration:run```

