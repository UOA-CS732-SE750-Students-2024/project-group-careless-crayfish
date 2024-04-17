docker-compose -f /home/ec2-user/cs732-careless-crayfish/docker-compose-prod.yml down
docker-compose -f /home/ec2-user/cs732-careless-crayfish/docker-compose-prod.yml rm -f
docker-compose -f /home/ec2-user/cs732-careless-crayfish/docker-compose-prod.yml up -d --build --force-recreate
