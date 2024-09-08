# Senior Software Engineer Take-Home Programming Assignment for JavaScript

## Description

**Story**: There are over 100,000 flights a day, with millions of people and cargo being transferred
worldwide. With so many people and different carrier/agency groups, tracking where a person
might be can be hard. To determine a person's flight path, we must sort through all of their flight
records.

**Goal**: To create a microservice API to help us understand and track how a particular person’s
flight path may be queried. The API should accept a request that includes a list of flights defined
by a source and destination airport code. These flights may not be listed in order and must be
sorted to find the total flight paths starting and ending at airports.

## Usage

Send POST requests to the `/calculate` endpoint with an array containing the list of flights.

## API Endpoint

### POST `/calculate`

#### Request Body

- An array of arrays, each containing two strings representing the origin and destination airport codes.

#### Response Body

- `start`: The starting airport code.
- `end`: The ending airport code.


## Install dependencies

```bash
npm install
```


## Run the service

```bash
npm run start
```

### Sample request

```bash
$ curl -i http://localhost:8080/calculate \
    -H "Content-Type: application/json" \
    -d '[["IND", "EWR"], ["SFO", "ATL"], ["GSO", "IND"], ["ATL", "GSO"]]'  
```

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 13
ETag: W/"d-NEzqly+OwdNXzpS6IrP4srkGofs"
Date: Sun, 08 Sep 2024 00:47:41 GMT
Connection: keep-alive
Keep-Alive: timeout=5

["SFO","EWR"]
```

## Run the tests
```bash
npm run test
```
