docker-compose -f ../docker-compose-ci.yml down
docker-compose -f ../docker-compose-ci.yml rm -f
docker-compose -f ../docker-compose-ci.yml up --build --force-recreate