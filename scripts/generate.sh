#!/bin/bash

openssl req -x509 -nodes -newkey rsa:2048 -keyout cert.key -out cert.crt -days 365 \
  -subj "/C=BR/ST=Denial/L=Springfield/O=Dis/CN=www.saudify.com" \
  -keyout csr/saudify.key  -out csr/saudify.cert
