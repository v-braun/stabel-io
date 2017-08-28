FROM microsoft/aspnetcore-build:2.0 AS build-env
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
COPY tsconfig.json ./
COPY tslint.json ./
COPY ./client ./client/
COPY ./client_build ./client_build/
RUN npm install
RUN npm run build



# build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /app
COPY --from=build-env /app/out ./
COPY --from=build-env-client /app/wwwroot ./wwwroot/

ENTRYPOINT ["dotnet", "Stabel.IO.dll"]