# ![stabel.io](http://localhost:3000/assets/logo.svg)
> source of https://stabel.io

By [v-braun - viktor-braun.de](https://viktor-braun.de).


## WHY
I love [shields.io](http://shields.io/) but it lacks support for on-premises build servers and custom badges.

## HOW
Powered by Angular2 and ASP.NET Core. <br /> 
Run on Docker in Azure.

## WHERE
Check it out at [GitHub](https://github.com/v-braun/stabel-io).

## WHO
That's [me](https://viktor-braun.de)


# Development
## run the backend in watch mode
    export ASPNETCORE_ENVIRONMENT=Development
    dotnet watch run
## run the the frontend in watch mode
    npm run serve
## run in Docker
	docker-compose up -d

The files are stored in a Azure BlobStorage.
For test reasons there is a InMem implementation.
In dev mode it is used.

## Configuration
Two configurations are supported:

- Development (*appsettings.Development.json*)
- Production (*appsettings.Production.json*)

The development config is already included in the .gitignore file.


```JavaScript
{
  // application version
  "AppVersion": "1.0.0",
  // Azure BlobStorage connection string 
  // if empty: in Mem will be used
  "AzureStorageConnectionString":  "", 
  
  // Logging configurations
  "Logging": {
    "IncludeScopes": false,
    "LogLevel": {
      "Default": "Debug",
      "System": "Information",
      "Microsoft": "Information"
    }
  }
}
```

    
### Known Issues

If you discover any bugs, feel free to create an issue on GitHub fork and
send me a pull request.

[Issues List](https://github.com/v-braun/stabel-io/issues).

## Authors

![image](https://avatars3.githubusercontent.com/u/4738210?v=3&s=50)  
[v-braun](https://github.com/v-braun/)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

See [LICENSE](https://github.com/v-braun/stabel-io/blob/master/LICENSE).