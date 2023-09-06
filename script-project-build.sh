#!/bin/bash

for project in blog server; do
  cd $project
  npm run build
  cd ..
done
