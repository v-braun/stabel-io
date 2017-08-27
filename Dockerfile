FROM microsoft/dotnet:1.1.2-runtime
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# build runtime image
FROM microsoft/dotnet:2.0-runtime 
WORKDIR /app
COPY /app/out ./

ENTRYPOINT ["dotnet", "Stabel.IO.dll"]