Prerequisite
------------------------------------------------------------------------
*node (include npm)
*ruby/ compass http://compass-style.org/install/


Instalare dependente si start compiling
------------------------------------------------------------------------
```
npm install
```

Optional - ruleaza pentru preluare modificarilor din fisier - typescript este compilat in javascript via webpack
------------------------------------------------------------------------

```
npm run build
npm run buildwatch
./node_modules/.bin/webpack --watch
```

build distribution
```
npm run builddist
```

Optional - ruleaza pentru preluare modificarilor din fisier - compilare css
------------------------------------------------------------------------
```
npm run css
npm run csswatch
```

Unit test
------------------------------------------------------------------------
```
npm run test
npm run testwatch
```


Start server
------------------------------------------------------------------------
```
npm run start
```

Server local
------------------------------------------------------------------------
http://localhost:3003


Instalare neo4j
------------------------------------------------------------------------
Download https://neo4j.com/download/community-edition/


Creare baze de date neo4j si rulare local
------------------------------------------------------------------------
* Database location: ...\Neo4j\default.graphdb
* Pornire server local : http://localhost:7474/browser/
* Rulare script de inserare a datelor - locatia scriptului /data/NeoScript.txt
