#!/bin/bash
curl --location --request POST 'http://localhost:3000/' \
--header 'Accept: application/json' \
--form 'index={"aJSON":"with-data"}' \
--form "content=@$1"