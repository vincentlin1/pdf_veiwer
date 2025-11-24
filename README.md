# pdf_veiwer

# Wild West Forum (midterm Project)

This is a simple Node.js + Express + Handlebars app using Docker and Nginx. 


features:
veiwing/downloading pdf and metadata
# prerequisites

- Docker(https://www.docker.com/get-started) installed
- Docker Compose(https://docs.docker.com/compose/install/) installed
- If trying to run on your own server and set up SSL Certificates and setting up proxy go to https://tschotter.github.io/webserver-tomb/11-putting-server-on-map/proxy-manager-and-ssl.html
- 
# setup & Run

1. Clone the repository:
ssh git clone in your own server
2. go into the clone:
cd \pdf_veiwer
3. bring up the sever make sure 3034 is allowed:
docker compose build 
docker compose up -d 
4. stop the dockers or bring it down:
docker compose down when done
5. to remove all dockers 
docker container prune to remove all dockers
