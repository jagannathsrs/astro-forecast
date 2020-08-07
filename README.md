# Astro-forecast backend
This is the backend for the astro-forecast website(https://jagannathsrs.github.io/astro). It uses nestJS framework and is deployed on an AWS Lambda using the serverless plugin.
## Architecture

![Architecture](https://github.com/jagannathsrs/astro-forecast/blob/master/astro-archi.png)

## API Documentation

### Get Forecast

Get a 7 day forecast of cloud cover of a given latitude and longitude.

**URL** : `/prod?lat=<latitude>&lon=<longitude>`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Example**
latitute = 40.4281443
Longitude = -79.9304523

Response:
```
{
    "address": "3819, Beechwood Boulevard, Greenfield, Pittsburgh, Allegheny County, Pennsylvania, 15217, United States of America",
    "lat": 40.42821665281832,
    "lon": -79.9304373791576,
    "forecast": [
        {
            "date": "Thursday, August 6th",
            "sunrise": "06:23",
            "sunset": "06:23",
            "moonrise": "22:28",
            "moonset": "09:08",
            "moonillumination": "94",
            "cloudcover": [
                {
                    "time": "19:00",
                    "cover": 26
                },
                {
                    "time": "22:00",
                    "cover": 13
                }
            ]
        },
......
    ]
}
```

### Prepare

```
$ Clone this repository
$ cd astro-forecast
$ npm install
$ npm start
```

### Development
#### use NestCLI

```
$ npm start
```

```
$ npm start
> serverless-nestjs@0.0.0 start /Users/sakakibara/dev/serverless-nestjs
> nest start

[Nest] 3905   - 11/29/2019, 4:40:49 PM   [NestFactory] Starting Nest application...
[Nest] 3905   - 11/29/2019, 4:40:49 PM   [InstanceLoader] AppModule dependencies initialized +20ms
[Nest] 3905   - 11/29/2019, 4:40:49 PM   [RoutesResolver] AppController {/}: +6ms
[Nest] 3905   - 11/29/2019, 4:40:49 PM   [RouterExplorer] Mapped {/, GET} route +3ms
[Nest] 3905   - 11/29/2019, 4:40:49 PM   [NestApplication] Nest application successfully started +4ms
```

Then browse http://localhost:3000

#### use serverless-offline
__after also doing an: `npm run build`__

```bash
$ sls offline
```

```
$ sls offline
Serverless: Starting Offline: dev/us-east-1.

Serverless: Routes for index:
Serverless: ANY /
Serverless: ANY /{proxy*}

Serverless: Offline listening on http://localhost:3000
```

Then browse http://localhost:3000

## How to Deploy
```bash
$ npm run prestart:prod && sls deploy
```

Then browse http://localhost:3001/api

**This function is for development.** If you want to use production, change package.json dependencies and serverless.yml.
