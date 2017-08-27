FROM microsoft/aspnetcore-build:1.1 AS build-env
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out


# build client
FROM node:6 AS build-env-client
WORKDIR /app
COPY *.js ./
COPY package.json ./
COPY ./client ./client/
COPY ./client_build ./client_build/
RUN npm install
RUN npm install gulp -g
RUN npm run build



# build runtime image
FROM microsoft/aspnetcore:1.1
WORKDIR /app
COPY --from=build-env /app/out ./
COPY --from=build-env-client /app/wwwroot ./wwwroot/

EXPOSE 80

ENTRYPOINT ["dotnet", "Stabel.IO.dll"]