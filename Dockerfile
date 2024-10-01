# #docker build -t name/tag
# FROM node:16.14.2 as build
# WORKDIR /app
# COPY package.json .
# COPY package-lock.json .
# RUN npm install --silent
# COPY . .
# RUN npm run build
# # CMD ["npm","start"]            

# FROM nginx
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80

FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8082

CMD [ "npm", "run", "dev" ]

#build the image with local dockerfile and push to acr 
# az acr build --image ram:v2 --registry mm2932acr --file Dockerfile .
# az acr repository list --name <myContainerRegistry> --output table
# az acr repository show-tags --name <myContainerRegistry> \
#     --repository sample/hello-world --output table

#create container instance using acr image. az container create .. (from portal ??)
# az container show --resource-group mmci2932 --name ram --query "{FQDN:ipAddress.fqdn,ProvisioningState:provisioningState}" --out table

#mmacr2932.azurecr.io/ram:v2

# az container create --resource-group containerapps --name screensc --image mmacr2932.azurecr.io/screens:dev1 --ports 8082 --dns-name-label screensc --location eastus
# az acr create --resource-group containerapps --name screensb --sku basic
# az container show --resource-group containerapps --name screens --query "{FQDN:ipAddress.fqdn,ProvisioningState:provisioningState}

#SECRETS
#Add secret using cli or ui to a specific mount path
#copy secrets in to container from the mount path in the dockerfile
# iMToNDfbQOSsQ1sg/SiC6Uc8H78OX53NGW47ETkHzb+ACRBwnLJp